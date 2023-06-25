import { CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import { MdPhotoCamera } from "react-icons/md";

const useStyles = makeStyles((theme) => ({
  avatarRoot: {
    margin: '16px 0px',
  },
  input: {
    display: 'none',
  },
  avatar: {
    width: 72,
    height: 72,
  },
  avatarInput: {
    width: 72,
    height: 72,
    backgroundColor: '#000000',
    color: '#FFFFFF',
    '&:hover': {
      color: '#000000',
    },
  },
}));

const UploadAvatar = ({ selectedImage, handleImageChange, uploading }: any) => {
  const classes = useStyles();


  return (
    <div className={classes.avatarRoot}>
      {uploading ?
        <div className={classes.avatar}>
          <CircularProgress />
        </div>
        :
        (
          selectedImage ?
            <label htmlFor="avatar-upload">
              <input
                accept="image/*"
                className={classes.input}
                id="avatar-upload"
                type="file"
                onChange={handleImageChange}
              />

              <IconButton color="primary" component="span">
                <Avatar className={classes.avatar} src={selectedImage} />
              </IconButton>
            </label>
            :
            <label htmlFor="avatar-upload">
              <input
                accept="image/*"
                className={classes.input}
                id="avatar-upload"
                type="file"
                onChange={handleImageChange}
              />
              <IconButton
                className={classes.avatarInput}
                component="span">
                <MdPhotoCamera />
              </IconButton>
            </label>
        )
      }
    </div>
  );
};

export default UploadAvatar;