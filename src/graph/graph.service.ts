import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class GraphService {
  // Method to get an access token for Microsoft Graph API
  async getAccessToken(req: Request): Promise<string> {
    const token = req.session?.token;
    if (!token) {
      throw new UnauthorizedException('Access token not found in session.');
    }
    return token;
  }
}
