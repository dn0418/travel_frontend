import { Button, CircularProgress, FormControlLabel, Switch, Tab, Tabs, TextField } from "@mui/material";
import Image from "next/legacy/image";
import { MdCloudUpload } from "react-icons/md";
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
  images: string[];
  inputData: any;
  setInputData: any;
}

function CreateNewCar({
  currentTab,
  handleImageChange,
  inputData,
  handleRemoveImage,
  handleTabChange,
  images,
  setInputData,
  uploading,
  uploadThumbnail,
  tabs
}: PropsType) {


  return (
    <div className="w-full my-8">
      <div className="w-full flex flex-col items-center gap-4">
        <div className='lg:w-[70%] text-center py-3 px-6 regular-shadow rounded-lg'>
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
        <SectionTitle title="Create New Car Without Driver" />
      </div>
      <div hidden={currentTab.value !== 'en'}>
        <div className="mx-5 lg:mx-12 grid grid-cols-1 lg:grid-cols-2 gap-4">
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
          <div className="col-span-2">
            <FormControlLabel
              onChange={(e: any) => setInputData({
                ...inputData,
                freeCancellation: e.target.checked
              })}
              control={<Switch defaultChecked={inputData.freeCancellation} />}
              label="Free Cancelation"
            />
          </div>
          <TextField
            label='Name'
            onChange={(e: any) => setInputData({
              ...inputData,
              name: e.target.value
            })}
            variant='outlined'
            className="w-full"
          />
          <TextField
            label='Price'
            onChange={(e: any) => setInputData({
              ...inputData,
              price: e.target.value
            })}
            variant='outlined'
            className="w-full"
            type="number"
          />
          <TextField
            label='Pickup'
            onChange={(e: any) => setInputData({
              ...inputData,
              pickup: e.target.value
            })}
            variant='outlined'
            className="w-full"
          />
          <TextField
            label='Fuel'
            onChange={(e: any) => setInputData({
              ...inputData,
              fuel: e.target.value
            })}
            variant='outlined'
            className="w-full"
          />
          <TextField
            label='Year'
            onChange={(e: any) => setInputData({
              ...inputData,
              year: e.target.value
            })}
            variant='outlined'
            className="w-full"
            type="number"
          />
          <TextField
            label='Seat No.'
            onChange={(e: any) => setInputData({
              ...inputData,
              seatNo: e.target.value
            })}
            variant='outlined'
            className="w-full"
            type="number"
          />
          <TextField
            label='Short Description'
            onChange={(e: any) => setInputData({
              ...inputData,
              shortDescription: e.target.value
            })}
            variant='outlined'
            className="w-full col-span-2"
            multiline
            rows={3}
          />
          <div className="col-span-2 w-full">
            <p className="font-medium uppercase">Car Description</p>
            <SunTextEditor onChange={(e: any) => setInputData({
              ...inputData,
              description: e.target.value
            })}
            />
          </div>
          <div className="col-span-2 w-full">
            <p className="font-medium uppercase">Car Images</p>
            <div
              className="grid w-full py-5 md:py-8 grid-cols-1 md:grid-cols-2
             lg:grid-cols-3  gap-4">
              {
                images?.length > 0 &&
                images.map((image: string, i: number) => (
                  <div key={i} className="w-full relative">
                    <Image
                      width={1000}
                      height={500}
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
      </div>

      <div className="mt-5" hidden={currentTab.value !== 'ru'}>
        <div className="mx-5 lg:mx-12 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="col-span-2">
            <FormControlLabel
              onChange={(e: any) => setInputData({
                ...inputData,
                isRu: e.target.checked
              })}
              control={<Switch defaultChecked={inputData.isRu} />}
              label="Is Russian Data Available"
            />
          </div>
          <TextField
            label='Name(ru)'
            onChange={(e: any) => setInputData({
              ...inputData,
              name_ru: e.target.value
            })}
            variant='outlined'
            className="w-full"
          />
          <TextField
            label='Pickup(ru)'
            onChange={(e: any) => setInputData({
              ...inputData,
              pickup_ru: e.target.value
            })}
            variant='outlined'
            className="w-full"
          />
          <TextField
            label='Fuel(ru)'
            onChange={(e: any) => setInputData({
              ...inputData,
              fuel_ru: e.target.value
            })}
            variant='outlined'
            className="w-full"
          />
          <TextField
            label='Short Description(ru)'
            onChange={(e: any) => setInputData({
              ...inputData,
              shortDescription_ru: e.target.value
            })}
            variant='outlined'
            className="w-full col-span-2"
            multiline
            rows={3}
          />
          <div className="col-span-2 w-full">
            <p className="font-medium uppercase">Car Description(ru)</p>
            <SunTextEditor onChange={(e: any) => setInputData({
              ...inputData,
              description_ru: e.target.value
            })} />
          </div>
        </div>
      </div>

      <div className="mt-5" hidden={currentTab.value !== 'hy'}>
        <div className="mx-5 lg:mx-12 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="col-span-2">
            <FormControlLabel
              onChange={(e: any) => setInputData({
                ...inputData,
                isHy: e.target.checked
              })}
              control={<Switch defaultChecked={inputData.isHy} />}
              label="Is Armenian Data Available"
            />
          </div>
          <TextField
            label='Name(hy)'
            onChange={(e: any) => setInputData({
              ...inputData,
              name_hy: e.target.value
            })}
            variant='outlined'
            className="w-full"
          />
          <TextField
            label='Pickup(hy)'
            onChange={(e: any) => setInputData({
              ...inputData,
              pickup_hy: e.target.value
            })}
            variant='outlined'
            className="w-full"
          />
          <TextField
            label='Fuel(hy)'
            onChange={(e: any) => setInputData({
              ...inputData,
              fuel_hy: e.target.value
            })}
            variant='outlined'
            className="w-full"
          />
          <TextField
            label='Short Description(hy)'
            onChange={(e: any) => setInputData({
              ...inputData,
              shortDescription_hy: e.target.value
            })}
            variant='outlined'
            className="w-full col-span-2"
            multiline
            rows={3}
          />
          <div className="col-span-2 w-full">
            <p className="font-medium uppercase">Car Description(hy)</p>
            <SunTextEditor onChange={(e: any) => setInputData({
              ...inputData,
              description_hy: e.target.value
            })} />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Button variant="contained">Create Car Without driver</Button>
      </div>
    </div>
  );
};

export default CreateNewCar;