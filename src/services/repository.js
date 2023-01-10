import axios from "axios";
let data_res = {
    status:200,
    message: 'data send'
};
export const apiDataPost = async (url,data)=>{
try{

await axios.post(url, data).then((res) => {
    data_res = res.data;
   
      });
    }catch(err){
        const res = {
            status: 400,
            message: 'network_error'
        };
        data_res = res;
    }
    return data_res;
}

export const apiDataGet = async (url,data)=>{
    try{
      await  axios.get(url, data).then((res) => {
        data_res= res.data;
        return data_res;
          });
        }catch(e){
            const res = {
                status: 400,
                message: 'network_error'
            };
            data_res = res;
        }
        return data_res;

    }

    export const apiDataDelete = async (url,data)=>{
        try{
           await axios.delete(url, data).then((res) => {
                data_res = res.data;
            return data_res;
              });
            }catch(e){
                const res = {
                    status: 400,
                    message: 'network_error'
                };
                data_res = res;
            }
            return data_res;

        }