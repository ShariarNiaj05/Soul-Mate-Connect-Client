import axios from 'axios'

const axiosPublic = axios.create({
    baseURL: 'https://soul-mate-connect-server.vercel.app',

})
 
const useAxiosPublic = () => {
 return axiosPublic
}
 
export default useAxiosPublic
 
 
useAxiosPublic.propTypes = {
 
};