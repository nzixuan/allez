import './CreatePostComponent.scss';

import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';

import { Group } from '@material-ui/icons';
import { PostTags } from '../../interface/Schemas';
import { useSelector } from 'react-redux';

const CreatePostComponent = () => {
  const [media, setMedia] = useState<File | null>();
  const [filePreview, setFilePreview] = useState<string | null>();
  const [state, setState] = useState<PostTags>({
    media: '',
    caption: '',
    gym: '',
    route: '',
    people: '',
  });

  // const user = useSelector(
  //   (state: { user: { user: User } }) => state.user.user
  // );
  // useEffect(() => {
  //   if (user) {
  //     setState(user);
  //   }
  // }, [user]);

  const handleChange =
    (prop: keyof PostTags) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, [prop]: event.target.value });
    };

  const handleEditMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files);
    if (e.target.files) {
      if (e.target.files[0]) {
        setMedia(e.target.files[0]);
        setFilePreview(URL.createObjectURL(e.target.files[0]));
      } else {
        setFilePreview(null);
      }
    } else {
      setFilePreview(null);
    }
  };

  const removeMedia = (): void => {
    if (filePreview) {
      setMedia(undefined);
      setFilePreview(undefined);
    }
  };

  const onSubmit = (e: any): void => {
    // preventDefault prevents the page from refreshing when the form is submitted
    e.preventDefault();
    //TODO: API Stuuf
  };

  return (
    <div className="CreatePostComponent" data-testid="CreatePostComponent">
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        spacing={2}
        xs={10}
        sm={8}
        md={6}
        lg={4}
      >
        <Grid item></Grid>
        <Grid item>
          <form onSubmit={(e) => onSubmit(e)}>
            <Grid
              container
              xs={12}
              spacing={2}
              alignItems="center"
              justify="center"
            >
              <Grid item>
                {filePreview != null ? (
                  media != null && media.type.includes('image') ? (
                    <div className="pseudoImage">
                      <img
                        src={filePreview}
                        className="img"
                        width="350"
                        onClick={removeMedia}
                      />
                    </div>
                  ) : media != null && media.type.includes('video') ? (
                    <video
                      width="350"
                      controls
                      src={filePreview}
                      onClick={removeMedia}
                    ></video>
                  ) : (
                    <Typography onClick={removeMedia}>
                      File type not supported
                    </Typography>
                  )
                ) : (
                  <label className="uploadButton">
                    <Input
                      id="mediaInput"
                      className="upload"
                      type="file"
                      // size="small"
                      // variant="text"
                      // color="primary"
                      onChange={handleEditMedia}
                    />{' '}
                    Select Media
                  </label>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Captions</InputLabel>
                  <Input
                    fullWidth
                    value={state.caption}
                    onChange={handleChange('caption')}
                    disableUnderline
                    multiline
                    rows={3}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Tag Gym</InputLabel>
                  <Input
                    fullWidth
                    value={state.gym}
                    onChange={handleChange('gym')}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Tag Route</InputLabel>
                  <Input
                    fullWidth
                    value={state.route}
                    onChange={handleChange('route')}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Tag People</InputLabel>
                  <Input
                    value={state.people}
                    onChange={handleChange('people')}
                    fullWidth
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button variant="text" color="primary" type="submit" fullWidth>
                  Post
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreatePostComponent;