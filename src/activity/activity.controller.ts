import { Controller, Req, Param, Headers, Body, Get, Post, Put, Delete } from '@nestjs/common';
import { Activity } from './interfaces/activity.interface';
import { ActivityService } from './activity.service';
import { createActivityDTO } from './dtos/createActivity.dto';
import * as jwt from 'jsonwebtoken';

const activityService = new ActivityService();

@Controller('activity')
export class ActivityController {
    @Get()
    async getAllActivities(@Headers('authorization') token: string): Promise<Activity[]> {
        console.log(process.env.SECRET_KEY);
        console.log(token);
        
        if (!token)
            throw new Error('Authorization header not found');

        const SECRET_KEY: string = process.env.SECRET_KEY || '';

        const decoded = jwt.verify(token, SECRET_KEY);

        if (!decoded || typeof decoded == 'string' || !decoded.userId)
            throw new Error('Invalid token');

        return activityService.findAll(decoded.userId);

    }

    @Post()
    async createActivity(
        @Headers('authorization') token: string,
        @Body() createActivity: createActivityDTO
    ): Promise<Activity> {
        if (!token)
            throw new Error('Authorization header not found');
        
        const SECRET_KEY: string = process.env.SECRET_KEY || '';
        
        const decoded = jwt.verify(token, SECRET_KEY);
        
        if (!decoded || typeof decoded == 'string' ||!decoded.userId)
            throw new Error('Invalid token');

        return activityService.create(createActivity);
    }

    @Put(':activityId')
    async updateActivity(
        @Headers('authorization') token: string,
        @Body() createActivity: createActivityDTO,
        @Param() params: any
    ): Promise<Activity | null> {
        if (!token)
            throw new Error('Authorization header not found');

        const SECRET_KEY: string = process.env.SECRET_KEY || '';

        const decoded = jwt.verify(token, SECRET_KEY);

        if (!decoded || typeof decoded == 'string' ||!decoded.userId)
            throw new Error('Invalid token');

        const activityId = parseInt(params?.activityId);
        
        return activityService.update(activityId, createActivity);
    }

    @Delete(':activityId')
    async deleteActivity(
        @Headers('authorization') token: string,
        @Param() params: any
    ): Promise<boolean> {
        if (!token)
            throw new Error('Authorization header not found');
        
        const SECRET_KEY: string = process.env.SECRET_KEY || '';
        
        const decoded = jwt.verify(token, SECRET_KEY);

        if (!decoded || typeof decoded == 'string' ||!decoded.userId)
            throw new Error('Invalid token');

        const activityId = parseInt(params?.activityId);
        
        return activityService.delete(activityId);
    }
}
