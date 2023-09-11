import { Button, CircularProgress, FormControlLabel, Switch, Tab, Tabs, TextField } from "@mui/material";
import Image from "next/legacy/image";
import { MdCloudUpload } from "react-icons/md";
import { SurroundingInputType } from "../../../types/input-type";
import SunTextEditor from "../../common/SunEditor";
import SectionTitle from "../../common/section-title";
import AdminGoogleMap from "../google-maps";

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
  images: string[];
  inputData: SurroundingInputType;
  setInputData: any;
  handleSubmit: any;
  handleInputChange: (name: string, value: string) => void;
  isLoading: boolean;
}

function CreateNewSurrounding({
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
        <SectionTitle title="Create New To Do in Surrounding" />
      </div>
      <div hidden={currentTab.value !== 'en'}>
        <div className="mx-5 lg:mx-12 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {
            inputData.thumbnail ?
              <div className="w-full relative">
                <Image
                  width={560}
                  height={340}
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
                    <div className="flex items-center justify-center flex-col py-8">
                      <MdCloudUpload className="text-2xl" />
                      <p className="my-2">
                        (560 x 340)
                      </p>
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
          <div className="col-span-2">
            <AdminGoogleMap
              setState={setInputData}
              state={inputData}
            />
          </div>

          <TextField
            label='Name'
            onChange={(e: any) => handleInputChange('name', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.name}
          />

          <TextField
            label='Type'
            onChange={(e: any) => handleInputChange('type', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.type}
          />

          <TextField
            label='From Tbilisi/Tehran'
            onChange={(e: any) => handleInputChange('fromTbilisi', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.fromTbilisi}
          />
          <TextField
            label='Date'
            onChange={(e: any) => handleInputChange('date', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.date}
            type="date"
          />
          <TextField
            label='Nearest Settlement'
            onChange={(e: any) => handleInputChange('neatestSettlement', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.neatestSettlement}
          />
          <TextField
            label='Available'
            onChange={(e: any) => handleInputChange('available', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.available}
          />
          <TextField
            label='Entrance'
            onChange={(e: any) => handleInputChange('entrance', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.entrance}
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
            <p className="font-medium uppercase">To Do in Surrounding Description</p>
            <SunTextEditor
              onChange={(text: string) => handleInputChange('description', text)}
              text={inputData.description}
            />
          </div>
          <div className="col-span-2 w-full">
            <p className="font-medium uppercase">To Do in Surrounding Images</p>
            <div
              className="grid w-full py-5 md:py-8 grid-cols-1 md:grid-cols-2
             lg:grid-cols-3  gap-4">
              {
                images?.length > 0 &&
                images.map((image: string, i: number) => (
                  <div key={i} className="w-full relative">
                    <Image
                      width={560}
                      height={340}
                      src={image}
                      className="rounded-lg"
                      alt="airport transport"
                      layout="responsive"
                    />
                    <Button
                      onClick={() => handleRemoveImage(i)}
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
                        (560 x 340)
                      </p>
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
            {isLoading ? "Creating..." : "Create To Do in Surrounding"}
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
            label='Type(Ru)'
            onChange={(e: any) => handleInputChange('type_ru', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.type_ru}
          />
          <TextField
            label='From Tbilisi/Tehran(ru)'
            onChange={(e: any) => handleInputChange('fromTbilisi_ru', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.fromTbilisi_ru}
          />
          <TextField
            label='Nearest Settlement(ru)'
            onChange={(e: any) => handleInputChange('neatestSettlement_ru', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.neatestSettlement_ru}
          />
          <TextField
            label='Available(ru)'
            onChange={(e: any) => handleInputChange('available_ru', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.available_ru}
          />
          <TextField
            label='Entrance(ru)'
            onChange={(e: any) => handleInputChange('entrance_ru', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.entrance_ru}
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
            <p className="font-medium uppercase">To Do in Surrounding Description(ru)</p>
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
            label='Type(Hy)'
            onChange={(e: any) => handleInputChange('type_hy', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.type_hy}
          />
          <TextField
            label='From Tbilisi/Tehran(hy)'
            onChange={(e: any) => handleInputChange('fromTbilisi_hy', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.fromTbilisi_hy}
          />
          <TextField
            label='Nearest Settlement(hy)'
            onChange={(e: any) => handleInputChange('neatestSettlement_hy', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.neatestSettlement_hy}
          />
          <TextField
            label='Available(hy)'
            onChange={(e: any) => handleInputChange('available_hy', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.available_hy}
          />
          <TextField
            label='Entrance(hy)'
            onChange={(e: any) => handleInputChange('entrance_hy', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.entrance_hy}
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
            <p className="font-medium uppercase">To Do in Surrounding Description(hy)</p>
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

export default CreateNewSurrounding;