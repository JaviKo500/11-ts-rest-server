import { Response, Request } from 'express';
import User from '../models/user';
export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
    res.status(200).json({
      msg: 'get Users',
      users
    });
}
export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk( id );
    if ( !user ) {
      res.status(404).json({
        msg: `user not exist id:  ${id}`,
      });
    }
    res.status(200).json({
      msg: 'get User',
      user
    });
}
export const postUser = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const existUser = await User.findOne({ where: { email: body.email }});

      if (existUser) {
        return res.status(400).json({
          msg: `User exits -> ${body.email}`,
        });
      }

      const user = await User.create( body );
      res.status(200).json({
        msg: 'post User',
        user
      });
    } catch (error: any) {
      res.status(500).json({
        msg: 'Talk with admin',
        error: error.toString(),
      });
    }
}
export const putUser = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const userExist = await User.findByPk( id );
    if ( !userExist ) {
      return res.status(404).json({
        msg: 'Not exit user',
      });
    }

    await userExist.update( body );
    res.status(200).json({
      msg: 'put User',
      userExist
    });
  } catch (error: any) {
    res.status(500).json({
      msg: 'Talk with admin',
      error: error.toString(),
    });
  }
}
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userExist = await User.findByPk( id );
    if ( !userExist ) {
      return res.status(404).json({
        msg: 'Not exit user',
      });
    }

    await userExist.update( { status: false } );
    res.status(200).json({
      msg: 'delete User',
      userExist
    });
  } catch (error: any) {
    res.status(500).json({
      msg: 'Talk with admin',
      error: error.toString(),
    });
  }
}

