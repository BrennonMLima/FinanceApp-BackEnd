import Group, { IGroup } from '../models/group.model';

class GroupService {
  public async createGroup(name: string, description?: string, members?: string[]): Promise<IGroup> {
    const newGroup = new Group({ name, description, members });
    return await newGroup.save();
  }

  public async getGroupById(groupId: string): Promise<IGroup | null> {
    return await Group.findById(groupId).populate('members').exec();
  }

  public async getAllGroups(): Promise<IGroup[]> {
    return await Group.find().populate('members').exec();
  }

}

export default GroupService;
