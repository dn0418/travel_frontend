import { Box, Button, CircularProgress, FormControlLabel, Slider, Switch, Tab, Tabs, TextField, Typography } from "@mui/material";
import Image from "next/legacy/image";
import { MdCloudUpload } from "react-icons/md";
import { ImageType } from "../../../types";
import { MiceInputType } from "../../../types/input-type";
import SunTextEditor from "../../common/SunEditor";
import SectionTitle from "../../common/section-title";

interface PropsType {
  handleImageChange: any;
  uploadThumbnail: any;
  handleRemoveImage: any;
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
  images: ImageType[];
  inputData: MiceInputType;
  setInputData: any;
  handleSubmit: any;
  handleInputChange: (name: string, value: string) => void;
  isLoading: boolean;
}

function UpdateNewMice({
  currentTab,
  handleImageChange,
  inputData,
  handleRemoveImage,
  handleTabChange,
  images,
  setInputData,
  uploading,
  uploadThumbnail,
  tabs,
  handleSubmit,
  handleInputChange,
  isLoading,
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
        <SectionTitle title="Update Mice" />
      </div>
      <div hidden={currentTab.value !== 'en'}>
        <div className="mx-5 lg:mx-12 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            {
              inputData.thumbnail ?
                <div className="w-full relative">
                  <Image
                    width={1000}
                    height={500}
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
           justify-center w-full min-h-[220px] relative bg-[#f1f1f1]  rounded-lg">
                  {
                    uploading ?
                      <div className="w-24 h-24"><CircularProgress /></div> :
                      <div className="flex items-center justify-center flex-col py-8">
                        <MdCloudUpload className="text-2xl" />
                        <p className="my-2">
                          Choose an <span className="text-[#6f7531] font-bold">Thumbnail</span> to upload.
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
          </div>
          <div className=""></div>
          <Box>
            <Typography id="input-slider">
              Score : {inputData.score}
            </Typography>
            <Slider
              value={inputData.score}
              aria-label="Volume"
              onChange={(e, f) => handleInputChange("score", f.toString())} />
          </Box>
          <TextField
            label='Free Cancelation'
            onChange={(e: any) => handleInputChange('freeCancellation', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.freeCancellation}
          />
          <FormControlLabel
            control={
              <Switch
                onChange={(e: any) => setInputData({
                  ...inputData,
                  access24: e.target.checked
                })}
                checked={inputData.access24}
              />}
            label="24 Hour Access"
          />
          <TextField
            label='Name'
            onChange={(e: any) => handleInputChange('name', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.name}
          />

          <TextField
            label='Comfortable hotels and transports'
            onChange={(e: any) => handleInputChange('comportable', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.comportable}
          />
          <TextField
            label='Teambuilding activities'
            onChange={(e: any) => handleInputChange('activities', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.activities}
          />
          <TextField
            label='Extra'
            onChange={(e: any) => handleInputChange('extra', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.extra}
          />
          <TextField
            label='Short Description'
            onChange={(e: any) => handleInputChange('shortDescription', e.target.value)}
            variant='outlined'
            className="w-full col-span-2"
            multiline
            rows={3}
            value={inputData.shortDescription}
          />
          <div className="col-span-2 w-full">
            <p className="font-medium uppercase">Mice Description</p>
            <SunTextEditor
              onChange={(text: string) => handleInputChange('description', text)}
              text={inputData.description}
            />
          </div>
          <div className="col-span-2 w-full">
            <p className="font-medium uppercase">Mice Images</p>
            <div
              className="grid w-full py-5 md:py-8 grid-cols-1 md:grid-cols-2
             lg:grid-cols-3  gap-4">
              {
                images?.length > 0 &&
                images.map((image: ImageType, i: number) => (
                  <div key={i} className="w-full relative">
                    <Image
                      width={1000}
                      height={500}
                      src={image.url}
                      className="rounded-lg"
                      alt="airport transport"
                      layout="responsive"
                    />
                    <Button
                      onClick={() => handleRemoveImage(image.id)}
                      className="absolute min-w-fit shadow py-0 px-[5px] text-sm
                     -top-1 -right-1 bg-red-600 text-white rounded-full">X</Button>
                  </div>
                ))
              }
              <div
                className="border-2 border-[#0000004d] border-dashed flex items-center
           justify-center w-full min-h-[170px] relative bg-[#f1f1f1]  rounded-lg">
                {
                  uploading ?
                    <div className="w-16 h-16"><CircularProgress /></div> :
                    <div className="flex items-center justify-center flex-col py-8">
                      <MdCloudUpload className="text-2xl" />
                      <p className="my-2">
                        Choose an <span className="text-[#6f7531]">Image</span> to upload.
                      </p>
                    </div>
                }
                <input
                  type="file"
                  className="block border-none absolute top-0 left-0 
                right-0 bottom-0 opacity-0"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex mx-5 lg:mx-12 justify-start mt-8">
          <Button
            disabled={isLoading}
            onClick={handleSubmit}
            className="py-3"
            variant="contained">
            {isLoading ? "Updating..." : "Update Mice"}
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
            label='Name(ru)'
            onChange={(e: any) => handleInputChange('name_ru', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.name_ru}
          />
          <TextField
            label='Comfortable hotels and transports(ru)'
            onChange={(e: any) => handleInputChange('comportable_ru', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.comportable_ru}
          />
          <TextField
            label='Teambuilding activities(ru)'
            onChange={(e: any) => handleInputChange('activities_ru', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.activities_ru}
          />
          <TextField
            label='Extra(ru)'
            onChange={(e: any) => handleInputChange('extra_ru', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.extra_ru}
          />
          <TextField
            label='Free Cancelation(ru)'
            onChange={(e: any) => handleInputChange('freeCancellation_ru', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.freeCancellation_ru}
          />
          <TextField
            label='Short Description(ru)'
            onChange={(e: any) => handleInputChange('shortDescription_ru', e.target.value)}
            variant='outlined'
            className="w-full col-span-2"
            multiline
            rows={3}
            value={inputData.shortDescription_ru}
          />
          <div className="col-span-2 w-full">
            <p className="font-medium uppercase">Mice Description(ru)</p>
            <SunTextEditor
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
            label='Name(hy)'
            onChange={(e: any) => handleInputChange('name_hy', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.name_hy}
          />
          <TextField
            label='Comfortable hotels and transports(hy)'
            onChange={(e: any) => handleInputChange('comportable_hy', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.comportable_hy}
          />
          <TextField
            label='Teambuilding activities(hy)'
            onChange={(e: any) => handleInputChange('activities_hy', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.activities_hy}
          />
          <TextField
            label='Extra(hy)'
            onChange={(e: any) => handleInputChange('extra_hy', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.extra_hy}
          />
          <TextField
            label='Free Cancelation(hy)'
            onChange={(e: any) => handleInputChange('freeCancellation_hy', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.freeCancellation_hy}
          />
          <TextField
            label='Short Description(hy)'
            onChange={(e: any) => handleInputChange('shortDescription_hy', e.target.value)}
            variant='outlined'
            className="w-full col-span-2"
            multiline
            rows={3}
            value={inputData.shortDescription_hy}
          />
          <div className="col-span-2 w-full">
            <p className="font-medium uppercase">Mice Description(hy)</p>
            <SunTextEditor
              onChange={(text: string) => handleInputChange('description_hy', text)}
              text={inputData.description_hy}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateNewMice;