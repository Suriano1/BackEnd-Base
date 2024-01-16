import jwt from 'jsonwebtoken';

export class UtilsTokenAuth {
  public static jwtGenerate(userPayload: {
    id: string;
    name: string | null;
    email: string;
    password?: string;
  }) {
    const payload = userPayload;
    delete payload.password;
    const acessToken = jwt.sign({ payload }, `${process.env.JWT_SECRET}`, {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign(
      { payload: { id: payload.id } },
      `${process.env.JWT_REFRESH_TOKEN_SECRET}`,
    );
    return { acessToken, refreshToken };
  }
}
