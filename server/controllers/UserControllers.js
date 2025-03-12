import dotenv from "dotenv";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const SECRET = process.env.SECRET;

/**
 * @description Регистрация нового пользователя
 * @param {Object} req - Объект запроса
 * @param {Object} res - Объект ответа
 * @access private
 * @method post
 */
export const registerUser = async (req, res) => {
  try {
    const userEmail = await UserModel.findOne({ email: req.body.email });

    if (userEmail) {
      return res.status(400).json({
        message: "Пользователь уже существует с такой почтой"
      });
    }

    const password = req.body.password;

    if (password.length < 8) {
      return res.status(401).json({
        message: "Пароль должен быть не менее 8 символов"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      fullName: req.body.fullName,
      email: req.body.email.toLowerCase(),
      password: hashPassword
    });

    const user = await doc.save();

    const token = jwt.sign(
      { _id: user._id },
      SECRET,
      { expiresIn: "30d" }
    );

    const userData = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Не удалось зарегестрироваться"
    });
  }
};

/**
 * @description Вход пользователя в систему
 * @param {Object} req - Объект запроса
 * @param {Object} res - Объект ответа
 * @access private
 * @method post
 */
export const loginUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email.toLowerCase() });

    if (!user) {
      return res.status(400).json({
        message: "Неправильный логин или пароль"
      });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.password
    );

    if (!isValidPassword) {
      return res.status(400).json({
        message: "Неверный логин или пароль"
      });
    }

    const token = jwt.sign(
      { _id: user._id },
      SECRET,
      { expiresIn: "30d" }
    );

    const { password, ...userData } = user._doc;

    res.status(200).json({ ...userData, token });
  } catch (error) {
    res.status(400).json({
      message: "Ошибка входа"
    });
  }
};

/**
 * @description Получение данных пользователя
 * @param {Object} req - Объект запроса
 * @param {Object} res - Объект ответа
 * @access public
 * @method get
 */
export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).send({
        message: "Пользователь не найден"
      });
    }

    const { password, ...userData } = user._doc;
    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Не удалось получить пользователя"
    });
  }
};