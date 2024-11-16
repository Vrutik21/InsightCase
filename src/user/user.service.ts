import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { prismaError } from 'src/shared/filters/error-handling';
import * as appConfig from '../../appConfig.json';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    try {
      return await this.prisma.user.findMany();
    } catch (err) {
      prismaError(err);
    }
  }

  async getUserProfile(accessToken: string) {
    const access =
      'eyJ0eXAiOiJKV1QiLCJub25jZSI6Im9hbGU2eVdQQmNmVmUxZVpaeE50LWdvMHRrd2VFSno4WEZMaUlka0JPRFkiLCJhbGciOiJSUzI1NiIsIng1dCI6IjNQYUs0RWZ5Qk5RdTNDdGpZc2EzWW1oUTVFMCIsImtpZCI6IjNQYUs0RWZ5Qk5RdTNDdGpZc2EzWW1oUTVFMCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81NTU0MGZjZS00NWUxLTRjMDgtODRkMi1hYThiNDBiMzViNjcvIiwiaWF0IjoxNzMxNTU4ODYxLCJuYmYiOjE3MzE1NTg4NjEsImV4cCI6MTczMTU2NDA0MSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFZUUFlLzhZQUFBQThFemw5czJJR2hsdTJhSmF0UGpUSk1VZ2c2bzBWSlNkcVpCYnBVTStmY0dDRkVuV09SUTF1OW1sWm9oK1RlNEVDT3poejVMbWkyU0hWRHhQQ3BKZEUrb3N2RGFQN0FDMjhsalgyaG9kZS9LNEIvYkpCcENlZDhjZks5b2lyUnNkMXFaRG5BWjhaK0o0dlRCT1BzTDliZFhnTXBGejdCRmIxZ2tWM3pqcXF5MD0iLCJhbHRzZWNpZCI6IjE6bGl2ZS5jb206MDAwMzAwMDE4NzM5OUJFOCIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwX2Rpc3BsYXluYW1lIjoiY2FzZS1hcHAiLCJhcHBpZCI6IjFlNjRlMzkzLTBhZDctNDI5MC1iZWM4LTViZGU2OTMyNzM2NCIsImFwcGlkYWNyIjoiMSIsImVtYWlsIjoicGFybWFydnJ1dGlrM0BnbWFpbC5jb20iLCJmYW1pbHlfbmFtZSI6IlBhcm1hciIsImdpdmVuX25hbWUiOiJWcnV0aWsiLCJpZHAiOiJsaXZlLmNvbSIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjE4NC4xNDcuOTIuMjE0IiwibmFtZSI6IlZydXRpayBQYXJtYXIiLCJvaWQiOiJmYzUwODcxNS03YmFlLTRmZTAtODgwNC1iMWU5MWI1MGQ0ODEiLCJwbGF0ZiI6IjMiLCJwdWlkIjoiMTAwMzIwMDNGRDJDNTA4RSIsInJoIjoiMS5BWEVCemc5VVZlRkZDRXlFMHFxTFFMTmJad01BQUFBQUFBQUF3QUFBQUFBQUFBQnhBWEp4QVEuIiwic2NwIjoiQ2FsZW5kYXJzLlJlYWRXcml0ZSBNYWlsLlJlYWQgb3BlbmlkIHByb2ZpbGUgVGFza3MuUmVhZCBUYXNrcy5SZWFkV3JpdGUgVXNlci5SZWFkIGVtYWlsIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoibWtXLTdoVmNoRXJtdUFxS0ZCemdndHJZOXprbDkyTmZNN3N5MHd3VmZJbyIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJOQSIsInRpZCI6IjU1NTQwZmNlLTQ1ZTEtNGMwOC04NGQyLWFhOGI0MGIzNWI2NyIsInVuaXF1ZV9uYW1lIjoibGl2ZS5jb20jcGFybWFydnJ1dGlrM0BnbWFpbC5jb20iLCJ1dGkiOiJEbnMtSmtYdmFrYUxoWTJfR1ZnMkFnIiwidmVyIjoiMS4wIiwid2lkcyI6WyI2MmU5MDM5NC02OWY1LTQyMzctOTE5MC0wMTIxNzcxNDVlMTAiLCJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2lkcmVsIjoiMSAxMiIsInhtc19zdCI6eyJzdWIiOiI3cXBMVWlCVVV3bU1HMGpZajFKY2lHZWNmM2cxWS1HOU5seGNjREdXcmxrIn0sInhtc190Y2R0IjoxNzMxNTM3MzgzfQ.V6-3V4y_Q4bRJDTdgTWWiARPeqZws0xJnfsd4zGecfcx3ZC584EOvD2NQHCDoUjbUH8xX5mPq6OWiaZpWs1XImwB49gKBmZiibxWtxoj3gcWHZNThnNsBtiUelrUhr1RFgHKC6eYWCNWwVQPSHb9aTmOllrXyVgEugR4Gls8BYM7KVFxIPE0BW0DUvN94810RR6OhKjbxp7JgTEFK0kL-CYauCMJzJLUKjM3teKCkOUxjhd4lhqQapIk2AE_nx3eishXDs1o7Uip2eMS6VpbpBe2FcOLj134yTQSJdDWirSPxU5XNFRVW_XtJ9Mah5vHsfBE0w_D3CZkcFICs1PrCg';
    const url = appConfig.GRAPH_API_ROOT_URL + '/me/todo/lists';
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return await axios.get(url, { headers });
  }

  // async createCalendarEvent(userEmail: string, task: Task) {
  //   const accessToken = await this.getAccessToken(); // Retrieve Microsoft Graph API access token

  //   const event = {
  //     subject: `New Task: ${task.description}`,
  //     body: {
  //       contentType: 'HTML',
  //       content: `You have a new task due on ${task.due_date}. Description: ${task.description}`,
  //     },
  //     start: {
  //       dateTime: task.due_date.toISOString(),
  //       timeZone: 'UTC',
  //     },
  //     end: {
  //       dateTime: new Date(task.due_date.getTime() + 60 * 60 * 1000).toISOString(),
  //       timeZone: 'UTC',
  //     },
  //     attendees: [
  //       {
  //         emailAddress: {
  //           address: userEmail,
  //           name: 'Assigned Staff',
  //         },
  //         type: 'required',
  //       },
  //     ],
  //   };

  //   const response = await fetch('https://graph.microsoft.com/v1.0/me/events', {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(event),
  //   });

  //   if (!response.ok) {
  //     throw new Error('Failed to create calendar event');
  //   }

  //   return response.json();
  // }
}
