import { Button, CircularProgress, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, Tab, Tabs, TextField } from "@mui/material";
import Image from "next/legacy/image";
import { MdCloudUpload } from "react-icons/md";
import { RubricType } from "../../../types/armenia";
import { BlogInputType } from "../../../types/input-type";
import SunPostEditor from "../../common/post-editor";
import SectionTitle from "../../common/section-title";

interface PropsType {
  uploadThumbnail: any;
  handleTabChange: any;
  currentTab: {
    title: string;
    value: string;
  };
  tabs: {
    title: string;
    value: string;
  }[];
  uploading: boolean;
  inputData: BlogInputType;
  setInputData: any;
  handleSubmit: any;
  handleInputChange: (name: string, value: string) => void;
  isLoading: boolean;
  rubrics: RubricType[];
}

function UpdateAdminBlog({
  currentTab,
  inputData,
  handleTabChange,
  setInputData,
  uploading,
  uploadThumbnail,
  tabs,
  handleSubmit,
  handleInputChange,
  isLoading,
  rubrics
}: PropsType) {

  return (
    <div className="w-full my-8">
      <div className="w-full flex flex-col items-center gap-4">
        <div className='lg:w-[60%] text-center py-3 px-6 regular-shadow rounded-lg'>
          <Tabs
            value={currentTab.value}
            onChange={handleTabChange}
            className='pages-tabs gap-5'
            TabIndicatorProps={{
              style: { display: "none" },
            }}>
            {
              tabs.map((tab: { value: string; title: string; }, i: number) => (
                <Tab key={i} value={tab.value} className="" label={tab.title} />
              ))
            }
          </Tabs>
        </div>
        <SectionTitle title="Update Travel Blog" />
      </div>
      <div hidden={currentTab.value !== 'en'}>
        <div className="mx-5 lg:mx-12 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {
            inputData.thumbnail ?
              <div className="w-full relative">
                <Image
                  height={340}
                  width={560}
                  src={inputData.thumbnail}
                  className="rounded-lg"
                  alt="airport transport"
                  layout="responsive"
                />
                <Button
                  onClick={() => setInputData({ ...inputData, thumbnail: '' })}
                  className="absolute min-w-fit shadow py-0 px-[5px] text-sm
                     -top-1 -right-1 bg-red-600 text-white rounded-full">X</Button>
              </div>
              :
              <div
                className="border-2 border-[#0000004d] border-dashed flex items-center
           justify-center w-full min-h-[340px] relative bg-[#f1f1f1]  rounded-lg">
                {
                  uploading ?
                    <div className="w-24 h-24"><CircularProgress /></div> :
                    <div className="flex items-center justify-center flex-col py-5">
                      <MdCloudUpload className="text-2xl" />
                      <p>(560 x 340)</p>
                      <p className="my-2">
                        Choose a <span className="text-[#6f7531] font-bold">Thumbnail</span> to upload.
                      </p>
                    </div>
                }
                <input
                  type="file"
                  className="block border-none absolute top-0 left-0 
                right-0 bottom-0 opacity-0"
                  accept=".png, .jpg, .jpeg"
                  onChange={uploadThumbnail}
                />
              </div>
          }
          <div className=""></div>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Blog Rubric</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              value={inputData?.rubric}
              label='Blog Rubric'
              name="rubric"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            >
              {rubrics.map((rubric) => (
                <MenuItem key={rubric.id} value={rubric.id}>
                  {rubric.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label='Title'
            onChange={(e: any) => handleInputChange('title', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.title}
          />

          <TextField
            label='Author'
            onChange={(e: any) => handleInputChange('author', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.author}
          />


          <TextField
            label='Short Description'
            onChange={(e: any) => handleInputChange('short_description', e.target.value)}
            variant='outlined'
            className="w-full col-span-2"
            multiline
            rows={3}
            value={inputData.short_description}
          />

          <div className="col-span-2 w-full">
            <p className="font-medium uppercase">Blog Details</p>
            <SunPostEditor
              onChange={(text: string) => handleInputChange('description', text)}
              text={inputData.description}
            />
          </div>
        </div>

        <div className="flex mx-5 lg:mx-12 justify-start mt-8">
          <Button
            disabled={isLoading}
            onClick={handleSubmit}
            className="py-3"
            variant="contained">
            {isLoading ? "Updating..." : "Update Blog"}
          </Button>
        </div>
      </div>

      <div className="mt-5" hidden={currentTab.value !== 'ru'}>
        <div className="mx-5 lg:mx-12 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="col-span-2">
            <FormControlLabel
              control={
                <Switch
                  onChange={(e: any) => handleInputChange('isRu', e.target.checked)}
                  checked={inputData.isRu}
                />
              }
              label="Should Russian language be available for this tour?"
            />
          </div>
          <TextField
            label='Title(ru)'
            onChange={(e: any) => handleInputChange('title_ru', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.title_ru}
          />
          <TextField
            label='Author(ru)'
            onChange={(e: any) => handleInputChange('author_ru', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.author_ru}
          />

          <TextField
            label='Short Description(ru)'
            onChange={(e: any) => handleInputChange('short_description_ru', e.target.value)}
            variant='outlined'
            className="w-full col-span-2"
            multiline
            rows={3}
            value={inputData.short_description_ru}
          />
          <div className="col-span-2 w-full">
            <p className="font-medium uppercase">Blog Details(ru)</p>
            <SunPostEditor
              onChange={(text: string) => handleInputChange('description_ru', text)}
              text={inputData.description_ru}
            />
          </div>
        </div>
      </div>

      <div className="mt-5" hidden={currentTab.value !== 'hy'}>
        <div className="mx-5 lg:mx-12 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="col-span-2">
            <FormControlLabel
              control={
                <Switch
                  onChange={(e: any) => handleInputChange('isHy', e.target.checked)}
                  checked={inputData.isHy}
                />
              }
              label="Should Armenian language be available for this tour?"
            />
          </div>
          <TextField
            label='Title(hy)'
            onChange={(e: any) => handleInputChange('title_hy', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.title_hy}
          />
          <TextField
            label='Author(hy)'
            onChange={(e: any) => handleInputChange('author_hy', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.author_hy}
          />

          <TextField
            label='Short Description(hy)'
            onChange={(e: any) => handleInputChange('short_description_hy', e.target.value)}
            variant='outlined'
            className="w-full col-span-2"
            multiline
            rows={3}
            value={inputData.short_description_hy}
          />
          <div className="col-span-2 w-full">
            <p className="font-medium uppercase">Blog Details(hy)</p>
            <SunPostEditor
              onChange={(text: string) => handleInputChange('description_hy', text)}
              text={inputData.description_hy}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAdminBlog;