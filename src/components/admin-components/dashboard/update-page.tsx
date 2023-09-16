// @flow strict


import { Box, Button, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import client from "../../../rest-api/client";
import { StaticPageType } from "../../../types";
import { staticPages } from "../../../utils/data/static-pages";
import SunPostEditor from "../../common/post-editor";

interface PropsType {
  code: any;
  pageData: StaticPageType;
}

const UpdateStaticPage = ({ code, pageData }: PropsType) => {
  const [content, setContent] = useState(pageData?.content || "");
  const router = useRouter();
  const [updating, setUpdating] = useState(false);

  const findPage = () => {
    const find = staticPages.find(page => page.code === code);
    return find;
  };

  const handleSubmit = async () => {
    if (!content) {
      toast.error("Please enter content");
      return;
    }
    setUpdating(true);

    try {
      const res = await client.staticPages.update({
        name: findPage()?.title,
        code: findPage()?.code,
        content: content,
      });
      toast.success("Page updated successfully!");
      router.push("/admin/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Paper className="p-5 mx-3 my-8">
      <Typography
        sx={{ fontSize: "24px", color: "#081000", fontWeight: 600 }}>
        {`Update ${findPage()?.title} Page`}
      </Typography>
      <Box>
        <div className="my-6">
          <SunPostEditor
            onChange={(text: string) => setContent(text)}
            text={content}
          />
        </div>
        <div>
          <Button
            onClick={handleSubmit}
            disabled={updating}
            variant="contained">
            {updating ? "Updating..." : "Update Page"}
          </Button>
        </div>
      </Box>
    </Paper>
  );
};

export default UpdateStaticPage;