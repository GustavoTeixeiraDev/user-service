const UserProfile = require('../models/userProfileModel');

exports.getAllUsers = async (req, res) => {
  const users = await UserProfile.find();
  res.status(200).json(users);
};

exports.getUserById = async (req, res) => {
  try {
    const user = await UserProfile.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado." });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar o usuário." });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = new UserProfile(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar usuário.", error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await UserProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: "Usuário não encontrado." });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar usuário." });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await UserProfile.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado." });
    res.status(200).json({ message: "Usuário removido com sucesso." });
  } catch (err) {
    res.status(500).json({ message: "Erro ao excluir usuário." });
  }
};
