// @flow strict


import { Box, Button, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import client from "../../../rest-api/client";
import { staticPages } from "../../../utils/data/static-pages";
import SunTextEditor from "../../common/SunEditor";

interface PropsType {
  code: any;
}

const UpdateStaticPage = ({ code }: PropsType) => {
  const [content, setContent] = useState('');
  const router = useRouter();

  const findPage = () => {
    const find = staticPages.find(page => page.code === code);
    return find;
  };

  const handleSubmit = async () => {
    if (!content) {
      toast.error("Please enter content");
      return;
    }

    try {
      const res = await client.staticPages.update({
        name: findPage()?.title,
        code: findPage()?.code,
        content: content,
      });
      toast.success("Page updated successfully!");
      router.push("admin/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Paper className="p-5 mx-3 my-8">
      <Typography
        sx={{ fontSize: "24px", color: "#004C99", fontWeight: 600 }}>
        {`Update ${findPage()?.title} Page`}
      </Typography>
      <Box>
        <div className="my-6">
          <SunTextEditor
            onChange={(text: string) => setContent(text)}
            text={content}
          />
        </div>
        <div>
          <Button
            onClick={handleSubmit}
            variant="contained">
            Update Page
          </Button>
        </div>
      </Box>
    </Paper>
  );
};

export default UpdateStaticPage;