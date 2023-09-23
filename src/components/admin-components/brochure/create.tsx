import { Button, CircularProgress, TextField } from "@mui/material";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { MdCloudUpload } from "react-icons/md";
import SectionTitle from "../../common/section-title";

interface PropsType {
  uploadFile: any;
  uploading: boolean;
  inputData: any;
  handleSubmit: any;
  handleInputChange: (name: string, value: string) => void;
  isLoading: boolean;
}

function CreateNewBrochure({
  inputData,
  uploading,
  uploadFile,
  handleSubmit,
  handleInputChange,
  isLoading,
}: PropsType) {


  return (
    <div className="my-8 mx-5 lg:mx-12">
      <SectionTitle title="Create New Brochure" />
      <div>
        <div className=" grid grid-cols-1 gap-4">
          <div>
            {
              inputData.name ?
                <div
                  className="border-2 border-[#0000004d] border-dashed flex items-center
           justify-center w-full min-h-[340px] relative bg-[#f1f1f1]  rounded-lg">
                  {
                    uploading ?
                      <div className="w-24 h-24"><CircularProgress /></div> :
                      <div className="flex items-center justify-center flex-col py-8">
                        <BsFileEarmarkPdf size={48} className="text-red-700" />
                        <p className="my-5 text-[#6f7531] font-bold">
                          {inputData.name}
                        </p>
                      </div>
                  }
                  <input
                    type="file"
                    className="block border-none absolute top-0 left-0 
                right-0 bottom-0 opacity-0"
                    accept=".pdf"
                    onChange={uploadFile}
                  />
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
                        <p className="my-5">
                          Choose a <span className="text-[#6f7531] font-bold">PDF file</span> to upload.
                        </p>
                      </div>
                  }
                  <input
                    type="file"
                    className="block border-none absolute top-0 left-0 
                right-0 bottom-0 opacity-0"
                    accept=".pdf"
                    onChange={uploadFile}
                  />
                </div>
            }

          </div>
          <TextField
            label='Title'
            onChange={(e: any) => handleInputChange('title', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.title}
          />
          <TextField
            label='Title(Ru)'
            onChange={(e: any) => handleInputChange('title_ru', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.title_ru}
          />
          <TextField
            label='Title(Hy)'
            onChange={(e: any) => handleInputChange('title_hy', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.title_hy}
          />
        </div>
        <div className="flex justify-start mt-8">
          <Button
            disabled={isLoading}
            onClick={handleSubmit}
            className="py-3"
            variant="contained">
            {isLoading ? "Creating..." : "Create Brochure"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewBrochure;