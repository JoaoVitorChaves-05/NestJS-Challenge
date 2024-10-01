import { Injectable } from '@nestjs/common';
import database from '../database/database';
import { Activity } from './interfaces/activity.interface';
import { createActivityDTO }  from './dtos/createActivity.dto';

@Injectable()
export class ActivityService {
    async findAll(userId: number): Promise<Activity[]> {
        const allActivities: Activity[] = await database.activity.findMany({
            where: {
                userId: userId
            }
        })

        return allActivities;
    }

    async create(activity: createActivityDTO): Promise<Activity> {
        const newActivity = await database.activity.create({
            data: activity
        });
        return newActivity;
    }

    async update(activityId: number, activity: createActivityDTO ): Promise<Activity | null> {
        await database.activity.update({
            where: {
                id: activityId
            }, data: activity
        });
        return await database.activity.findUnique({
            where: {
                id: activityId
            }
        });
    }

    async delete(activityId: number): Promise<boolean> {
        await database.activity.delete({
            where: {
                id: activityId
            }
        });

        return true;
    }
}
