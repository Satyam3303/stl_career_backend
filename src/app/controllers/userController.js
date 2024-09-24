const {
  createUser,
  findUserByUserCode,
  findUserByPhone,
  findUserByEmail,
} = require("../../../models/User");

const {
  createAuthentication,
  findAuthenticationByUserCode,
} = require("../../../models/Authentication");

const { generateToken } = require("../utils/JWT");
const messages = require("../utils/messages.json");

const isPhoneNumberValid = (value) => /^[0-9]{10}$/.test(value);

exports.registerUser = async (req, res) => {
  try {
    const { name, phone, email, address, password, role_code } = req.body;

    if (!phone || !name || !email || !address || !password || !role_code) {
      return res.status(400).send({
        status_code: 400,
        success: false,
        message: messages.en.Users.error.empty_fields,
        response: {},
      });
    }

    let user_code;
    let checkCode;

    const generateUserCode = () => {
      return Math.random().toString(36).substring(2, 10).toUpperCase();
    };

    do {
      user_code = generateUserCode();
      checkCode = await findUserByUserCode(user_code);
    } while (checkCode);

    const checkPhone = await findUserByPhone(phone);
    const checkEmail = await findUserByEmail(email);

    if (checkPhone || checkEmail) {
      return res.status(400).send({
        status_code: 400,
        success: false,
        message:
          messages.en.Users.error.email_phone_userName_already_registered,
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

    const newUser = await createUser({
      user_code,
      name,
      phone,
      email,
      address,
      created_by: name,
      created_at: new Date(),
      updated_by: name,
      updated_at: new Date(),
    });

    const newAuthentication = await createAuthentication({
      user_code,
      password,
      role_code,
      email,
      address,
      created_by: name,
      created_at: new Date(),
      updated_by: name,
      updated_at: new Date(),
    });

    return res.status(201).send({
      status_code: 201,
      success: true,
      message: messages.en.Users.success.User_Create,
      response: {
        newUser: newUser,
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

// Get User By User Code
exports.getUserByUserCode = async (req, res) => {
  try {
    const { user_code } = req.params;

    if (!user_code) {
      return res.status(400).send({
        status_code: 400,
        success: false,
        message: messages.en.Users.error.user_code_Required,
        response: {},
      });
    }

    const user = await findUserByUserCode(user_code);

    if (!user) {
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
        user,
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
