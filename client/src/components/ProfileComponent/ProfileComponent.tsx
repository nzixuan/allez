import './ProfileComponent.scss';

import {
  Button,
  ButtonBase,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import { PublicUser, User } from '../../interface/Schemas';
import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import {
  fetchPublicUser,
  getUser,
  updateUserProfile,
} from '../Redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import Image from './../../static/404.png';
import SettingsIcon from '@material-ui/icons/Settings';

interface ID {
  id: string;
}

interface State {
  id: string;
  name: string;
  bio: string;
  img: ImageBitmap;
  avatar: string;
  postNumber: string;
  //TODO:

  postState: string;
  message: string;
}

const ProfileComponent: React.FC = (props) => {
  const [file, setFile] = useState<File>();
  const [filePreview, setFilePreview] = useState<string>();
  const dispatch = useDispatch();

  const history = useHistory();
  const username = useParams<ID>().id;
  const loggedInUser = useSelector((state: { user: { user: User } }) => {
    return state.user.user;
  });
  const [user, setUser] = useState<PublicUser>({
    name: '',
    username: '',
    avatar: '',
    bio: '',
    followCount: 0,
    followers: {},
  });
  /** Fetch the specified user on load */
  useEffect(() => {
    if (loggedInUser.username == username) {
      setState({ ...state, myself: true });
      setUser(loggedInUser);
    } else {
      axios
        .get('api/users/getPublicProfile', {
          headers: { username: username },
        })
        .then((data) => {
          setUser(data.data);
        });
    }
  }, [axios, username, loggedInUser]);

  const handleFetchUser = (prop: keyof PublicUser, data: any) => {
    setState({ ...state, [prop]: data });
  };

  const [state, setState] = useState({
    // to migrate to user in the future
    postNumber: 0,
    followNumber: 0,
    myself: false,
    following: false,

    postState: '',
    message: '',
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).toString() + 'mil';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).toString() + 'k';
    } else {
      return num.toString();
    }
  };

  const handleFollowButton = () => {
    setState({ ...state, following: !state.following });
    //TODO: API calls
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
    setFilePreview(URL.createObjectURL(e.target.files[0]));
  };

  const onUpdateProfile = () => {
    const formData = new FormData();
    const token = localStorage.getItem('token');
    if (file && token) {
      formData.append('file', file, file.name);
      // formData.append('username', user.username);
      // formData.append('avatar', user.avatar);
      formData.append('name', 'bruh');
      formData.append('token', token);
      formData.append('bio', 'whatzzeofrhweoifhew the fuck???');
      formData.append('followCount', 1500 as any);
      // dispatch(updateUserProfile(formData));
      axios
        .post('/api/users/updateProfile', formData)
        .then((data) => {
          setUser(data.data);
          setFile(undefined);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="ProfileComponent" data-testid="ProfileComponent">
      {/*  direction="row" */}
      <Grid container direction="row" alignItems="center" justify="center">
        <Grid item xs={10} sm={8} md={6} lg={4}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            spacing={2}
          >
            <Grid item>
              <ButtonBase>
                {/* <img src={state.img} className="img" /> */}
                <img src={user.avatar ? user.avatar : Image} className="img" />
              </ButtonBase>
            </Grid>
            <Grid item>
              <Typography>{user.name}</Typography>
            </Grid>
            <Grid item>
              <Typography>{user.bio}</Typography>
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing={1}>
                <Grid item>
                  <Typography>
                    {state.postNumber ? formatNumber(state.postNumber) : 0}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>posts</Typography>
                </Grid>
                <Grid item></Grid>
                <Grid item></Grid>
                <Grid item>
                  <Typography>
                    {user.followCount ? formatNumber(user.followCount) : 0}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>followers</Typography>
                  <input type="file" onChange={(e) => handleFileChange(e)} />
                  <Button type="button" onClick={() => onUpdateProfile()}>
                    Upload
                  </Button>
                  <img src={filePreview ? filePreview : ''} />
                </Grid>
              </Grid>
            </Grid>
            {state.myself ? (
              <Grid container direction="row" justify="flex-end">
                <IconButton
                  aria-label="settings"
                  onClick={() => {
                    history.push('/edit/profile');
                  }}
                >
                  <SettingsIcon />
                </IconButton>
              </Grid>
            ) : (
              <Grid item>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={handleFollowButton}
                >
                  {state.following ? 'Following' : 'Follow'}
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileComponent;
