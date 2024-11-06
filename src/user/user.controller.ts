import { Controller, Get, InternalServerErrorException, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { HttpStatus } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //   @Get()
  //   getAllusers() {
  //     return this.userService.getAllUsers();
  //   }

  @Get()
  // @UseGuards(AuthGuard)
  async getUserProfile(@Req() req: Request, @Res() res: Response): Promise<any> {
    try {
      console.log(req.session.token, 'token');
      const response = await this.userService.getUserProfile(req.session.token!);
      res.status(HttpStatus.OK).send(response.data);
    } catch (error) {
      const errMessage = 'Error getting user profile: ' + error.message;
      throw new InternalServerErrorException(errMessage);
    }
  }
}
