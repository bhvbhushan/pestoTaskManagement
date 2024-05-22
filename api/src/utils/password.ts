import bcrypt from "bcryptjs";

export const hash = async (raw: string, saltRound = 10) => {
  const salt = await bcrypt.genSalt(saltRound);
  const hashed = await bcrypt.hash(raw, salt);
  return hashed;
};

export const compare = async (raw: string, hashed: string) => {
  const isMatch = await bcrypt.compare(raw, hashed);
  return isMatch;
};
