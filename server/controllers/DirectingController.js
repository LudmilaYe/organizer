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

export const getAllDirecting = async (req, res) => {
  try {
    const directing = await DirectingModel.find()
      .populate("admins")
      .populate("members")
      .exec();

    return res.status(200).send(directing);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить направления",
    });
  }
};

export const getDirecting = async (req, res) => {
  try {
    const directind_id = req.params.id;
    const getDirecting = await DirectingModel.findById(directind_id);

    return res.status(200).send(getDirecting);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить направление",
    });
  }
};

export const getAdminsDirecting = async (req, res) => {
  try {
    const userId = req.userId;

    console.log(userId);

    const directing = await DirectingModel.find({ admins: userId });
    res.status(200).json(directing);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить направления",
    });
  }
};

export const updateDirecting = async (req, res) => {
  try {
    const directingId = req.params.id;

    const {
      name,
      description,
      admins,
      imagePath,
      secondDescription,
      secondImagePath,
      gallery,
    } = req.body;

    if (!name || !description || admins.length < 1) {
      return res.status(401).json({
        message: "Заполните все необходимые поля",
      });
    }

    const updateDirecting = await DirectingModel.findByIdAndUpdate(
      directingId,
      {
        name,
        description,
        admins,
        imagePath,
        secondDescription,
        secondImagePath,
        gallery,
      }
    );

    if (!updateDirecting) {
      return res.status(401).json({
        message: "Не удалось обновить направление!",
      });
    }

    return res.status(200).json(updateDirecting);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить направления",
    });
  }
};
