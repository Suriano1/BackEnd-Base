import { EStatusErrors } from 'enum/status-erros.enum';
import { EZod } from 'enum/zod.enum';
import { Request, Response } from 'express';
import { z } from 'zod';
import { resetPasswordService } from '../Service/reset-password-service';
import { ECrud } from 'enum/crud.enum';
class ResetPasswordController {
  public async validateUser(req: Request, res: Response) {
    const email = req.body.email;
    try {
      const ZUserSchema = z
        .string()
        .email({ message: `Email ${EZod.REQUIRED}` });
      ZUserSchema.parse(email);
    } catch (err: any) {
      return res.status(400).json({
        message: EStatusErrors.E400,
        error: err.errors,
      });
    }
    try {
      return res.json({
        message: 'Código enviado para ao email',
        data: await resetPasswordService.validateUser(email),
      });
    } catch (err: any) {
      return res.status(404).json({
        message: err.message,
      });
    }
  }
  public async validateSecurityCode(req: Request, res: Response) {
    const { email, secret } = req.body;
    try {
      const ZUserSchema = z.object({
        email: z.string().email({ message: `Email ${EZod.REQUIRED}` }),
        secret: z.string().min(6, { message: `Segredo ${EZod.REQUIRED}` }),
      });
      ZUserSchema.parse({ email, secret });
    } catch (err: any) {
      return res.status(400).json({
        message: EStatusErrors.E400,
        error: err.errors,
      });
    }
    try {
      return res.json({
        message: ECrud.READ,
        data: await resetPasswordService.validateSecurityCode(
          email,
          Number(secret),
        ),
      });
    } catch (err: any) {
      return res.status(404).json({
        message: EStatusErrors.E404,
        error: err.errors,
      });
    }
  }
  public async resetPassword(req: Request, res: Response) {
    const { email, secret, newPassword } = req.body;
    try {
      const ZUserSchema = z.object({
        email: z.string().email({ message: `Email ${EZod.REQUIRED}` }),
        secret: z.string().min(6, { message: `Segredo ${EZod.REQUIRED}` }),
        newPassword: z
          .string()
          .min(8, { message: `Nova senha ${EZod.REQUIRED}` }),
      });
      ZUserSchema.parse({ email, secret, newPassword });
    } catch (err: any) {
      return res.status(400).json({
        message: EStatusErrors.E400,
        error: err.errors,
      });
    }
    try {
      return res.json({
        message: ECrud.READ,
        data: await resetPasswordService.resetPassword(
          email,
          Number(secret),
          newPassword,
        ),
      });
    } catch (err: any) {
      return res.status(404).json({
        message: EStatusErrors.E404,
        error: err.errors,
      });
    }
  }
}
export const resetPasswordController = new ResetPasswordController();
