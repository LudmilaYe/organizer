import DirectingModel from "../models/DirectingModel.js";
import UserModel from "../models/UserModel.js";

export const createDirecting = async (req, res) => {
  try {
    const {
      name,
      description,
      admins,
      imagePath,
      secondDescription,
      secondImagePath,
    } = req.body;

    if (!name || !description || admins.length < 1) {
      return res.status(401).json({
        message: "Заполните все необходимые поля",
      });
    }

    const doc = new DirectingModel({
      name,
      description,
      admins,
      imagePath,
      secondDescription,
      secondImagePath,
    });

    const directing = await doc.save();

    const directingData = directing._doc;

    return res.status(200).json(directingData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создат направление",
    });
  }
};

export const getAllOrganizers = async (req, res) => {
  try {
    const organizers = await UserModel.find({
      role: {
        $in: [
          "Руководителя направления",
          "Руководитель в.о.",
          "Организатор",
          "Администратор",
        ],
      },
    });
    res.status(200).json(organizers);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить всех организаторов",
    });
  }
};
