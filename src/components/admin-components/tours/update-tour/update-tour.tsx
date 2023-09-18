import { Box, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Slider, Switch, Tab, Tabs, TextField, Typography } from "@mui/material";
import { UpdateTourPropsType } from "../../../../types/tour";
import { tourTypes } from "../../../../utils/data/tours-types";
import SunTextEditor from "../../../common/SunEditor";
import SectionTitle from "../../../common/section-title";
import UpdateDeparturesPricing from "./departures-pricing";
import CreateIndividualPricing from "./individual-pricing";
import TourThumbnail from "./thumbnail";
import TourImages from "./tour-images";
import UpdateTourRoute from "./tour-route";
import UpdateTourServices from "./tour-services";

function UpdateAdminTour({
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
  destinations,
  uploadLocation,
  childList,
  tourDetails
}: UpdateTourPropsType) {

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
        <div className="w-full flex justify-start px-5 lg:px-12 ">
          <SectionTitle title="Update Tour Data" />
        </div>
      </div>

      <div hidden={currentTab.value !== 'en'}>
        <div className="col-span-2">
          <FormControlLabel
            control={
              <Switch
                onChange={(e: any) => handleInputChange('topSuggested', e.target.checked)}
                checked={inputData.topSuggested}
              />
            }
            label="Should this tour show as top-suggested?"
          />
        </div>
        <TourThumbnail
          inputData={inputData}
          setInputData={setInputData}
          uploadLocation={uploadLocation}
          uploadThumbnail={uploadThumbnail}
          uploading={uploading}
        />
        <div className="mx-5 lg:mx-12 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TextField
            label='Title'
            onChange={(e: any) => handleInputChange('title', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.title}
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
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Tour Location</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              value={inputData?.destinationId}
              label='Tour Location'
              name="destinationId"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            >
              {destinations.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Tour main Type</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              value={inputData?.mainList}
              label='Tour main Type'
              name="mainList"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            >
              {tourTypes.en.map((type, i) => (
                <MenuItem key={i} value={type.value}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Tour Child Type</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              value={inputData?.childList}
              label='Tour child Type'
              name="childList"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            >
              {childList.map((type, i: number) => (
                <MenuItem key={i} value={type.value}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label='Price'
            onChange={(e: any) => handleInputChange('price', e.target.value)}
            variant='outlined'
            className="w-full"
            type="number"
            value={inputData.price}
          />
          <TextField
            label='Activities'
            onChange={(e: any) => handleInputChange('activities', e.target.value)}
            variant='outlined'
            className="w-full"
            type="number"
            value={inputData.activities}
          />
          <TextField
            label='Day length (Duration)'
            onChange={(e: any) => handleInputChange('dayLength', e.target.value)}
            variant='outlined'
            className="w-full"
            type="number"
            value={inputData.dayLength}
          />
          <TextField
            label='Night length (Duration)'
            onChange={(e: any) => handleInputChange('nightLength', e.target.value)}
            variant='outlined'
            className="w-full"
            type="number"
            value={inputData.nightLength}
          />
          <TextField
            label='Best Time'
            onChange={(e: any) => handleInputChange('bestTime', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.bestTime}
          />

          <div className="col-span-2">
            <FormControlLabel
              control={
                <Switch
                  onChange={(e: any) => setInputData({
                    ...inputData,
                    isFixedDate: e.target.checked
                  })}
                  checked={inputData.isFixedDate}
                />}
              label="Is Fixed Date"
            />
          </div>

          <TextField
            label='Start Date'
            onChange={(e: any) => handleInputChange('startDate', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.startDate}
            type="date"
          />
          <TextField
            label='End Date'
            onChange={(e: any) => handleInputChange('endDate', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.endDate}
            type="date"
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
            <p className="font-medium uppercase">Tour Description</p>
            <SunTextEditor
              onChange={(text: string) => handleInputChange('longDescription', text)}
              text={inputData.longDescription}
            />
          </div>
          <div className="col-span-2 w-full">
            <TourImages tourDetails={tourDetails} />
          </div>
        </div>
        <div className="mt-5 mx-5 lg:mx-12">
          <UpdateTourServices
            tourDetails={tourDetails}
          />
        </div>
        <div className="mt-5 mx-5 lg:mx-12">
          <CreateIndividualPricing
            tourDetails={tourDetails}
          />
        </div>
        <div className="mt-5 mx-5 lg:mx-12">
          <UpdateDeparturesPricing
            tourDetails={tourDetails}
          />
        </div>
        <div className="mt-5 mx-5 lg:mx-12">
          <UpdateTourRoute
            tourDetails={tourDetails}
          />
        </div>
        <div className="flex mx-5 lg:mx-12 justify-start mt-8">
          <Button
            disabled={isLoading}
            onClick={handleSubmit}
            className="py-3"
            variant="contained">
            {isLoading ? "Updating..." : "Update Tour"}
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
            label='Best Time(ru)'
            onChange={(e: any) => handleInputChange('bestTime_ru', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.bestTime_ru}
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
            label='Title(hy)'
            onChange={(e: any) => handleInputChange('title_hy', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.title_hy}
          />
          <TextField
            label='Best Time(hy)'
            onChange={(e: any) => handleInputChange('bestTime_hy', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.bestTime_hy}
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

export default UpdateAdminTour;