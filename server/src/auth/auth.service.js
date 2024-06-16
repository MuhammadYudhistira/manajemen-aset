const { findUserByNip } = require("../user/user.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (request) => {
  const user = await findUserByNip(request.nip);
  if (!user) throw new Error("Nip atau password yang anda masukkan salah");

  const passswordValidation = await bcrypt.compare(
    request.password,
    user.password
  );

  if (!passswordValidation)
    throw new Error("Nip atau password yang anda masukkan salah");

  const payload = {
    id: user.id,
    nip: user.nip,
    nama: user.nama,
    profile: user.profile,
    role: user.role,
  };

  const secret = process.env.JWT_SECRET;
  const expired = 60 * 60 * 24 * 1;
  const token = jwt.sign(payload, secret, { expiresIn: expired });

  return { user: payload, token };
};

module.exports = { login };
