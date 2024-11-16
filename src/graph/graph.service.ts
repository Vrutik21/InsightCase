import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as appConfig from 'appConfig.json';
import axios from 'axios';
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

  // Method to create a To Do list for a staff member
  async createToDoList(access_token: string, listName: string): Promise<string> {
    const endpoint = `${appConfig.GRAPH_API_ROOT_URL}/me/todo/lists`;
    const response = await axios.post(
      endpoint,
      { displayName: listName },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data.id; // Return the list ID
  }

  // Method to add a task to a specific To Do list
  async addTaskToToDoList(
    access_token: string,
    listId: string,
    title: string,
    dueDateTime: string,
  ) {
    const endpoint = `${appConfig.GRAPH_API_ROOT_URL}/me/todo/lists/${listId}/tasks`;
    await axios.post(
      endpoint,
      {
        title,
        dueDateTime: {
          dateTime: dueDateTime,
          timeZone: 'UTC',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
