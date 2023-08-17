import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { ButtonMain, CustomInput } from "../componenets";
import {
  useAddNewMessageMutation,
  useDeleteMessageMutation,
  useUpdateMessageMutation,
} from "../services/userApis";
import Loading from "../componenets/Loading";
import { useGetMessagesMutation } from "../services/authApis";
import Toastify from "../componenets/Toastify";
import { setIsLoggedIn, setUserDbData } from "../slices";

const inputStyle = {
  Input: {
    color: "#000",
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      fontWeight: 500,
      fontSize: "14px",
    },
  },
  width: "100%",
  backgroundColor: "#fff",
  borderRadius: "15px",
  mr: "10px",
  py: "8px",
  borderTopLeftRadius: "15px",
  borderBottomLeftRadius: "15px",
  borderTopRightRadius: "0px",
  borderBottomRightRadius: "0px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#fff",
    },
    "&:hover fieldset": {
      borderColor: "#fff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fff",
    },
  },
};

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [messageId, setMessageId] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });
  const [updateUserMessage, { isLoading: isLoadingUpdateUserMessage }] =
    useUpdateMessageMutation();
  const [addNewMessage, { isLoading: isLoadingAddNewMessage }] =
    useAddNewMessageMutation();
  const [getMessages, { isLoading: isLoadinggetMessages }] =
    useGetMessagesMutation();
  const [deleteMessages, { isLoading: isLoadingDeleteMessages }] =
    useDeleteMessageMutation();

  const showToast = useCallback((msg, type) => {
    return setAlertState({
      open: true,
      message: msg,
      severity: type,
    });
  }, []);

  const handleUpdateMessage = async () => {
    try {
      setEdit(false);
      const data = await updateUserMessage({
        messageId,
        message: updateMessage,
      }).unwrap();
      // eslint-disable-next-line no-use-before-define
      await userMessages();
      showToast(data?.message, "success");
      setUpdateMessage("");
    } catch (error) {
      showToast(error?.message, "error");
    }
  };

  const handleDeleteMessages = async () => {
    try {
      setDeleteMessage(false);
      const userMessage = await deleteMessages({ messageId }).unwrap();

      showToast(userMessage?.message, "success");
      // eslint-disable-next-line no-use-before-define
      await userMessages();
    } catch (error) {
      showToast(error?.message, "error");
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    // call api

    try {
      let userMessage = await addNewMessage({ message }).unwrap();

      // eslint-disable-next-line no-use-before-define
      await userMessages();
      showToast(userMessage?.message, "success");

      setMessage("");
    } catch (error) {
      showToast(error?.message, "error");
    }
  };
  const userMessages = async () => {
    try {
      const messages = await getMessages().unwrap();
      // console.log("messages list", messages);
      setMessageList(messages);
    } catch (error) {
      console.log(error);
    }
  };
  const logout = () => {
    localStorage.clear();
    dispatch(setUserDbData(null));
    dispatch(setIsLoggedIn(false));
    showToast("logout successfully", "success");

    navigate("/sign-in");
  };

  useEffect(() => {
    userMessages();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ my: 10 }}>
      <Toastify setAlertState={setAlertState} alertState={alertState} />
      <Loading
        loading={
          isLoadingUpdateUserMessage ||
          isLoadingAddNewMessage ||
          isLoadinggetMessages ||
          isLoadingDeleteMessages
        }
      />
      {/* ===============edit/update modal================= */}
      <Dialog
        fullWidth
        maxWidth="sm"
        open={edit}
        onClose={() => setEdit(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent
          sx={{
            background:
              "linear-gradient(#31312C, #2A2A29) padding-box,\n               linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%), border-box",

            border: "2px solid transparent",
          }}
        >
          {/* <Typography align="center" variant="h4" mb={3}>
            Are You Sure ?
          </Typography> */}
          <CustomInput
            value={updateMessage}
            onChange={(e) => setUpdateMessage(e.target.value)}
          />

          <Box display="flex" mt={3}>
            <ButtonMain
              sx={{
                fontSize: "15px",
                py: "12px",
                width: "48%",
                mx: 0.5,
              }}
              onClick={() => setEdit(false)}
            >
              Cancel
            </ButtonMain>
            <ButtonMain
              sx={{
                fontSize: "15px",
                py: "12px",
                width: "48%",
                mx: 0.5,
              }}
              onClick={handleUpdateMessage}
            >
              Update
            </ButtonMain>
          </Box>
        </DialogContent>
      </Dialog>

      {/* ===============delete modal================= */}
      <Dialog
        fullWidth
        maxWidth="sm"
        open={deleteMessage}
        onClose={() => setDeleteMessage(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent
          sx={{
            background:
              "linear-gradient(#31312C, #2A2A29) padding-box,\n               linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%), border-box",

            border: "2px solid transparent",
          }}
        >
          <Typography align="center" variant="h4" mb={3}>
            Are You Sure ?
          </Typography>
          {/* <CustomInput value={updateMessage} /> */}

          <Box display="flex" mt={3}>
            <ButtonMain
              sx={{
                fontSize: "15px",
                py: "12px",
                width: "48%",
                mx: 0.5,
              }}
              onClick={() => setDeleteMessage(false)}
            >
              Cancel
            </ButtonMain>
            <ButtonMain
              sx={{
                fontSize: "15px",
                py: "12px",
                width: "48%",
                mx: 0.5,
              }}
              onClick={handleDeleteMessages}
            >
              Delete
            </ButtonMain>
          </Box>
        </DialogContent>
      </Dialog>
      <Button onClick={logout}>logout</Button>

      <Box display="flex" width="100%" component="form" onSubmit={handelSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          sx={{
            ...inputStyle,
          }}
          placeholder="Enter message"
          size="small"
          fullWidth
        />
        <ButtonMain
          type="submit"
          className="hvr-bounce-to-right"
          sx={{
            width: "40%",
            ml: "-30px",
            fontSize: "16px",
          }}
        >
          Submit
        </ButtonMain>
      </Box>
      {messageList?.length > 0 ? (
        <>
          {messageList?.map((userMessage) => (
            <Box
              key={userMessage._id}
              sx={{
                border: "1px solid #E1AE3C",
                px: 2,
                py: 1,
                mt: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography>{userMessage?.message}</Typography>
              </Box>
              <Box>
                <IconButton
                  size="large"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() => {
                    setMessageId(userMessage._id);
                    setUpdateMessage(userMessage?.message);
                    setEdit(true);
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  size="large"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() => {
                    setMessageId(userMessage._id);
                    setDeleteMessage(true);
                  }}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          ))}
        </>
      ) : (
        <Box>
          <Typography> Your message list is empty </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Home;
