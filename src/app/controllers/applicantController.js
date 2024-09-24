const {
  createApplicant,
  findApplicantByApplicantCode,
  findApplicantByPhone,
  findApplicantByUserName,
  findApplicantByEmail,
  updateApplicant
} = require("../models/Applicant");

const bcrypt = require('bcrypt');
const saltRounds = 10;  // Number of salt rounds for hashing

const {
  createAuthentication,
  findAuthenticationByUserCode,
} = require("../models/Authentication");
const { role_code } = require("../Schema/authenticationSchema");

const { generateToken } = require("../utils/JWT");
const messages = require("../utils/messages.json");

const isPhoneNumberValid = (value) => /^[0-9]{10}$/.test(value);

// Register an Applicant
exports.registerApplicant = async (req, res) => {
  try {
    const { username, phone, email, password } = req.body;

    if (!username || !phone || !email || !password) {
      return res.status(400).send({
        status_code: 400,
        success: false,
        message: messages.en.Users.error.empty_fields,
        response: {},
      });
    }

    let applicant_code;
    let checkCode;

    const generateUserCode = () => {
      return Math.random().toString(36).substring(2, 10).toUpperCase();
    };

    do {
      applicant_code = generateUserCode();
      checkCode = await findApplicantByApplicantCode(applicant_code);
    } while (checkCode);

    const checkUserName = await findApplicantByUserName(username);
    // const checkEmail = await findApplicantByEmail(email);

    if (checkUserName) {
      return res.status(400).send({
        status_code: 400,
        success: false,
        message:
          messages.en.Users.error.userName_already_registered,
        response: {},
      });
    }

    if (!isPhoneNumberValid(phone)) {
      return res.status(400).send({
        status_code: 400,
        success: false,
        message: messages.en.Users.error.ten_digit_phone_number,
        response: {},
      });
    }

    const newAuthentication = await createAuthentication({
      user_code:applicant_code,
      password,
      email,
      created_by: applicant_code,
      created_at: new Date(),
      updated_by: applicant_code,
      updated_at: new Date(),
    });

    const newApplicant = await createApplicant({
      applicant_code,
      username,
      phone,
      email,
      created_by: applicant_code,
      created_at: new Date(),
      updated_by: applicant_code,
      updated_at: new Date(),
    });



    return res.status(201).send({
      status_code: 201,
      success: true,
      message: messages.en.Users.success.User_Create,
      response: {
        newApplicant: newApplicant,
        newAuthentication: newAuthentication,
      },
    });
  } catch (error) {
    return res.status(500).send({
      status_code: 500,
      success: false,
      message: messages.en.Users.error.internal_server_error,
      response:{
        error: error.message || error,
      }
    });
  }
};


// Get Applicant By Applicant Code
exports.getApplicantByApplicantCode = async (req, res) => {
  try {
    const { applicant_code } = req.params;

    if (!applicant_code) {
      return res.status(400).send({
        status_code: 400,
        success: false,
        message: messages.en.Users.error.user_code_Required,
        response: {},
      });
    }

    const applicant = await findApplicantByApplicantCode(applicant_code);

    if (!applicant) {
      return res.status(404).send({
        status_code: 404,
        success: false,
        message: messages.en.Users.error.User_Fetch,
        response: {},
      });
    }

    return res.status(200).send({
      status_code: 200,
      success: true,
      message: messages.en.Users.success.User_Fetch,
      response: {
        applicant,
      },
    });
  } catch (error) {
    return res.status(500).send({
      status_code: 500,
      success: false,
      message: messages.en.Users.error.internal_server_error,
      response: {
        error: error.message || error,
      },
    });
  }
};

// Login user
exports.loginApplicant = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the applicant by username
    const applicant = await findApplicantByUserName(username);

    if (!applicant) {
      return res.status(404).send({
        status_code: 404,
        message: messages.en.Users.error.no_user_found,
        response: {},
      });
    }

    // Find the hashed password using the applicant code
    const authenticationRecord = await findAuthenticationByUserCode(applicant.applicant_code);

    // Check if authenticationRecord exists and contains a valid password
    if (!authenticationRecord || !authenticationRecord.password) {
      return res.status(400).send({
        status_code: 400,
        success: false,
        message: messages.en.Users.error.invalid_Username_Or_Password,
        response: {},
      });
    }

    const authenticationPassword = authenticationRecord.password; // Ensure it's a string

    if (typeof password !== 'string' || typeof authenticationPassword !== 'string') {
      console.error('Password or authenticationPassword is not a string:', {
        password,
        authenticationPassword,
      });
      return res.status(500).send({
        status_code: 500,
        success: false,
        message: 'Internal Server Error: Passwords must be strings',
        response: {},
      });
    }

    // Compare the input password with the hashed password from the database
    const match = await bcrypt.compare(password, authenticationPassword);

    // Ensure to wait for the result of compare
    if (!match) {
      return res.status(400).send({
        status_code: 400,
        success: false,
        message: messages.en.Users.error.invalid_Username_Or_Password,
        response: {},
      });
    }

    // Generate a token for the authenticated user
    const token = generateToken(applicant);

    return res.status(200).send({
      status_code: 200,
      message: messages.en.Users.success.login,
      success: true,
      response: {
        token,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).send({
      status_code: 500,
      success: false,
      message: messages.en.Users.error.internal_server_error,
      response: {
        error: error.message || error,
      },
    });
  }
};

//Application for Applicant
exports.applyApplicant = async (req, res) => {
  try {
    const { applicant_code } = req.params;
    const { ...updateData } = req.body;

    // Check if a resume file was uploaded
    if (req.file) {
      updateData.resume_path = req.file.path; // Save the file path
    }

    const applicant = await findApplicantByApplicantCode(applicant_code);

    if (!applicant) {
      return res.status(404).send({
        status_code: 404,
        message: messages.en.Users.error.no_user_found,
        success: false,
        response: {},
      });
    }

    await updateApplicant(applicant_code, updateData);

    const updatedApplicant = await findApplicantByApplicantCode(applicant_code);

    return res.status(200).send({
      status_code: 200,
      message: messages.en.Users.success.User_Update,
      success: true,
      response: {
        applicant: updatedApplicant,
      },
    });
  } catch (error) {
    return res.status(500).send({
      status_code: 500,
      success: false,
      message: messages.en.Users.error.internal_server_error,
      response: {
        error: error.message || error,
      },
    });
  }
};


// // Delete a user
// exports.deleteUser = async (req, res) => {
// try {
// const { email } = req.params;

// const user = await findUserByEmail(email);

// if (!user) {
//   return res.status(404).send({
//     status_code: 404,
//     success: false,
//     message: messages.en.Users.error.User_Fetch,
//   });
// }

// await deleteUserByEmail(email);

// return res.status(200).send({
//   status_code: 200,
//   success: true,
//   message: messages.en.Users.success.User_Delete,
// });
// } catch (error) {
// return res.status(500).send({
//   status_code: 500,
//   success: false,
//   message: messages.en.Users.error.internal_server_error,
//   error,
// });
// }
// };

// // Update user
// exports.updateUser = async (req, res) => {
// try {
// const { email } = req.params; // Current email
// const { first_name, last_name, password, new_email, confirm_password, phone } = req.body;

// // Validate password and confirm_password match
// if (password !== confirm_password) {
//   return res.status(400).send({
//     status_code: 400,
//     success: false,
//     message: messages?.en?.Users?.error?.Passwords_Not_Equal
//   });
// }

// console.log('Request received:', { first_name, last_name, email, new_email, password, confirm_password, phone });

// // Find user by current email
// const user = await findUserByEmail(email);

// if (!user) {
//   console.log('User not found:', email);
//   return res.status(404).send({
//     status_code: 404,
//     success: false,
//     message: messages?.en?.Users?.error?.User_Fetch || "User not found",
//   });
// }

// // Check if the new email already exists in the database, and it should not belong to the same user
// if (new_email && new_email !== email) {
//   const checkEmail = await findUserByEmail(new_email);
//   if (checkEmail && checkEmail.email !== user.email) {
//     console.log('New email already registered for another user:', new_email);
//     return res.status(400).send({
//       status_code: 400,
//       success: false,
//       message: messages?.en?.Users?.error?.email_phone_userName_already_registered || "Email already registered",
//     });
//   }
// }

// // Check if the phone number is already registered with another user
// const checkPhone = await findUserByPhone(phone);
// if (checkPhone && checkPhone.email !== user.email) {
//   console.log('Phone number already registered for another user:', phone);
//   return res.status(400).send({
//     status_code: 400,
//     success: false,
//     message: messages?.en?.Users?.error?.email_phone_userName_already_registered,
//   });
// }

// // Validate phone number format
// if (!isPhoneNumberValid(phone)) {
//   console.log('Invalid phone number:', phone);
//   return res.status(400).send({
//     status_code: 400,
//     success: false,
//     message: messages?.en?.Users?.error?.ten_digit_phone_number,
//   });
// }

// // Update user fields (only if provided in the request body)
// user.first_name = first_name || user.first_name;
// user.last_name = last_name || user.last_name;
// user.email = new_email || user.email; // Update email if provided
// user.password = password || user.password;
// user.phone = phone || user.phone;

// // Save the updated user
// await user.save();

// console.log('User updated successfully:', user);
// return res.status(200).send({
//   status_code: 200,
//   success: true,
//   message: messages?.en?.Users?.success?.User_Update || "User updated successfully",
// });
// } catch (error) {
// console.error('Error during user update:', error);
// return res.status(500).send({
//   status_code: 500,
//   success: false,
//   message: messages?.en?.Users?.error?.internal_server_error || "Internal server error",
//   error: error.message,
// });
// }
// };

// // Login user
// exports.loginUser = async (req, res) => {
// try {
// const { email, password } = req.body;
// // , otpMethod
// const user = await findUserByEmail(email);

// if (!user) {
//   return res.status(404).send({
//     status_code: 404,
//     message: messages.en.Users.error.no_user_found,
//   });
// }

// if (password !== user.password) {
//   return res.status(400).send({
//     status_code: 400,
//     success: false,
//     message: messages.en.Users.error.invalid_Username_Or_Password,
//   });
// }

// // const otp = Math.floor(100000 + Math.random() * 900000);
// // otpStore[email] = otp;

// // if (otpMethod === "email") {
// //   sendMail(email, otp);
// // } else if (otpMethod === "phone") {
// //   sendSms(`Your OTP is ${otp}`, `+91${user.phone}`);
// // }

// const token = generateToken(user);

// // Clear the OTP from the store after successful verification
// // delete otpStore[email];

// return res.status(200).send({
//   status_code: 200,
//   message: messages.en.Users.success.login,
//   success: true,
//   token,
//   user
// });

// } catch (error) {
// return res.status(500).send({
//   status_code: 500,
//   success: false,
//   message: messages.en.Users.error.internal_server_error,
//   error: error.message || error,
// });
// }
// };

// // Get all users
// exports.getAllUsers = async (req, res) => {
// try {
// const users = await getAllUsers();
// return res.status(200).send({
//   status_code: 200,
//   success: true,
//   message: messages.en.Users.success.All_Users_Fetch,
//   users,
// });
// } catch (error) {
// return res.status(500).send({
//   status_code: 500,
//   success: false,
//   message: messages.en.Users.error.internal_server_error,
//   error,
// });
// }
// };

// // OTP Verification
// exports.verifyOtp = async (req, res) => {
// try {
// const { email, otp } = req.body;

// if (!email || !otp) {
//   return res.status(400).send({
//     status_code: 400,
//     success: false,
//     message: messages.en.Users.error.empty_fields,
//   });
// }

// // Check if the OTP is correct
// if (otpStore[email] && otpStore[email] == otp) {
//   const user = await findUserByEmail(email);

//   if (!user) {
//     return res.status(404).send({
//       status_code: 404,
//       message: messages.en.Users.error.no_user_found,
//     });
//   }

//   const token = generateToken(user);

//   // Clear the OTP from the store after successful verification
//   delete otpStore[email];

//   return res.status(200).send({
//     status_code: 200,
//     message: messages.en.Users.success.otp,
//     success: true,
//     token,
//   });
// } else {
//   return res.status(400).send({
//     status_code: 400,
//     success: false,
//     message: messages.en.Users.error.otp,
//   });
// }
// } catch (error) {
// return res.status(500).send({
//   status_code: 500,
//   success: false,
//   message: messages.en.Users.error.internal_server_error,
//   error: error.message || error,
// });
// }
// };


// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    const authenticationPassword = await findAuthenticationByUserCode(
      user.user_code
    );

    if (!user) {
      return res.status(404).send({
        status_code: 404,
        message: messages.en.Users.error.no_user_found,
        response: {},
      });
    }

    if (password !== authenticationPassword.password) {
      return res.status(400).send({
        status_code: 400,
        success: false,
        message: messages.en.Users.error.invalid_Username_Or_Password,
        response: {},
      });
    }

    const token = generateToken(user);

    return res.status(200).send({
      status_code: 200,
      message: messages.en.Users.success.login,
      success: true,
      response: {
        token,
      },
    });
  } catch (error) {
    return res.status(500).send({
      status_code: 500,
      success: false,
      message: messages.en.Users.error.internal_server_error,
      response: {
        error: error.message || error,
      },
    });
  }
};
