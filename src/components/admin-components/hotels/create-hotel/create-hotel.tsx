import { Box, Button, CircularProgress, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Slider, Switch, Tab, Tabs, TextField, Typography } from "@mui/material";
import Image from "next/legacy/image";
import { MdCloudUpload } from "react-icons/md";
import { HotelInputType } from "../../../../types/input-type";
import { HotelPricingTable, HotelTypes } from "../../../../types/services";
import SunTextEditor from "../../../common/SunEditor";
import SectionTitle from "../../../common/section-title";
import CreateHotelPricing from "./create-hotel-pricing";

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
  inputData: HotelInputType;
  setInputData: any;
  handleSubmit: any;
  setPricing: any;
  pricing: HotelPricingTable[];
  handleInputChange: (name: string, value: string) => void;
  isLoading: boolean;
  hotelsTypes: HotelTypes[];
}

function CreateNewHotel({
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
  pricing,
  setPricing,
  isLoading,
  hotelsTypes
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
        <SectionTitle title="Create New Hotel" />
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
          <TextField
            label='Google Maps Code (400 x 400)'
            onChange={(e: any) => handleInputChange('maps', e.target.value)}
            variant='outlined'
            className="w-full col-span-2"
            multiline
            rows={3}
            value={inputData.maps}
          />

          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Hotel Type</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              value={inputData?.type}
              label='Hotel Type'
              name="type"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            >
              {hotelsTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label='Name'
            onChange={(e: any) => handleInputChange('name', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.name}
          />
          <TextField
            label='Price'
            onChange={(e: any) => handleInputChange('price', e.target.value)}
            variant='outlined'
            className="w-full"
            type="number"
            value={inputData.price}
          />
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
          <TextField
            label='From Airport'
            onChange={(e: any) => handleInputChange('fromAirport', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.fromAirport}
          />
          <TextField
            label='Country'
            onChange={(e: any) => handleInputChange('country', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.country}
          />
          <TextField
            label='City'
            onChange={(e: any) => handleInputChange('city', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.city}
          />
          <TextField
            label='Check In Time'
            onChange={(e: any) => handleInputChange('checkInTime', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.checkInTime}
            type="time"
          />
          <TextField
            label='Check Out Time'
            onChange={(e: any) => handleInputChange('checkOutTime', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.checkOutTime}
            type="time"
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
            <p className="font-medium uppercase">Hotel Description</p>
            <SunTextEditor
              onChange={(text: string) => handleInputChange('longDescription', text)}
              text={inputData.longDescription}
            />
          </div>
          <div className="col-span-2 w-full">
            <p className="font-medium uppercase">Hotel Images</p>
            <div
              className="grid w-full py-5 md:py-8 grid-cols-1 md:grid-cols-2
             lg:grid-cols-3  gap-4">
              {
                images?.length > 0 &&
                images.map((image: string, i: number) => (
                  <div key={i} className="w-full relative">
                    <Image
                      height={340}
                      width={560}
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
                      <p>(560 x 340) </p>
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
        <div className="mt-5 mx-5 lg:mx-12">
          <CreateHotelPricing setPricing={setPricing} pricing={pricing} />
        </div>
        <div className="flex mx-5 lg:mx-12 justify-start mt-8">
          <Button
            disabled={isLoading}
            onClick={handleSubmit}
            className="py-3"
            variant="contained">
            {isLoading ? "Creating..." : "Create Hotel"}
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
            label='Country(ru)'
            onChange={(e: any) => handleInputChange('country_ru', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.country_ru}
          />
          <TextField
            label='City(ru)'
            onChange={(e: any) => handleInputChange('city_ru', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.city_ru}
          />
          <TextField
            label='Free Cancelation(ru)'
            onChange={(e: any) => handleInputChange('freeCancellation_ru', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.freeCancellation_ru}
          />
          <TextField
            label='From Airport(ru)'
            onChange={(e: any) => handleInputChange('fromAirport_ru', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.fromAirport_ru}
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
            <p className="font-medium uppercase">Hotel Description(ru)</p>
            <SunTextEditor
              onChange={(text: string) => handleInputChange('longDescription_ru', text)}
              text={inputData.longDescription_ru}
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
            label='Country(hy)'
            onChange={(e: any) => handleInputChange('country_hy', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.country_hy}
          />
          <TextField
            label='City(hy)'
            onChange={(e: any) => handleInputChange('city_hy', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.city_hy}
          />
          <TextField
            label='Free Cancelation(hy)'
            onChange={(e: any) => handleInputChange('freeCancellation_hy', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.freeCancellation_hy}
          />
          <TextField
            label='From Airport(hy)'
            onChange={(e: any) => handleInputChange('fromAirport_hy', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.fromAirport_hy}
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
            <p className="font-medium uppercase">Hotel Description(hy)</p>
            <SunTextEditor
              onChange={(text: string) => handleInputChange('longDescription_hy', text)}
              text={inputData.longDescription_hy}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewHotel;