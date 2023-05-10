import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { FRONTEND_URL } from '../config'
import Form from 'react-bootstrap/Form';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import {Button, Col, Container, Row} from "react-bootstrap";

const backend = BACKEND_URL + '/api'

const Register = () => {
  console.log(backend)
  console.log(FRONTEND_URL)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [gender, setGender] = useState('')
  const [mobilenumber, setMobilenumber] = useState('')
  const [district, setDistrict] = useState('')

  const [_, setCookies] = useCookies(['access_token'])
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await axios.post(backend + '/auth/register', {
        name,
        username,
        password,
        address,
        district,
        state,
        gender,
        mobilenumber,
      })
      alert('Registration Completed! Login to continue')
      // window.location.reload()
      navigate("/")
    } catch (error) {
      alert(error.message)
    }
  }

  var AndraPradesh = ["Anantapur","Chittoor","East Godavari","Guntur","Kadapa","Krishna","Kurnool","Prakasam","Nellore","Srikakulam","Visakhapatnam","Vizianagaram","West Godavari"];
  var ArunachalPradesh = ["Anjaw","Changlang","Dibang Valley","East Kameng","East Siang","Kra Daadi","Kurung Kumey","Lohit","Longding","Lower Dibang Valley","Lower Subansiri","Namsai","Papum Pare","Siang","Tawang","Tirap","Upper Siang","Upper Subansiri","West Kameng","West Siang","Itanagar"];
  var Assam = ["Baksa","Barpeta","Biswanath","Bongaigaon","Cachar","Charaideo","Chirang","Darrang","Dhemaji","Dhubri","Dibrugarh","Goalpara","Golaghat","Hailakandi","Hojai","Jorhat","Kamrup Metropolitan","Kamrup (Rural)","Karbi Anglong","Karimganj","Kokrajhar","Lakhimpur","Majuli","Morigaon","Nagaon","Nalbari","Dima Hasao","Sivasagar","Sonitpur","South Salmara Mankachar","Tinsukia","Udalguri","West Karbi Anglong"];
  var Bihar = ["Araria","Arwal","Aurangabad","Banka","Begusarai","Bhagalpur","Bhojpur","Buxar","Darbhanga","East Champaran","Gaya","Gopalganj","Jamui","Jehanabad","Kaimur","Katihar","Khagaria","Kishanganj","Lakhisarai","Madhepura","Madhubani","Munger","Muzaffarpur","Nalanda","Nawada","Patna","Purnia","Rohtas","Saharsa","Samastipur","Saran","Sheikhpura","Sheohar","Sitamarhi","Siwan","Supaul","Vaishali","West Champaran"];
  var Chhattisgarh = ["Balod","Baloda Bazar","Balrampur","Bastar","Bemetara","Bijapur","Bilaspur","Dantewada","Dhamtari","Durg","Gariaband","Janjgir Champa","Jashpur","Kabirdham","Kanker","Kondagaon","Korba","Koriya","Mahasamund","Mungeli","Narayanpur","Raigarh","Raipur","Rajnandgaon","Sukma","Surajpur","Surguja"];
  var Goa = ["North Goa","South Goa"];
  var Gujarat = ["Ahmedabad","Amreli","Anand","Aravalli","Banaskantha","Bharuch","Bhavnagar","Botad","Chhota Udaipur","Dahod","Dang","Devbhoomi Dwarka","Gandhinagar","Gir Somnath","Jamnagar","Junagadh","Kheda","Kutch","Mahisagar","Mehsana","Morbi","Narmada","Navsari","Panchmahal","Patan","Porbandar","Rajkot","Sabarkantha","Surat","Surendranagar","Tapi","Vadodara","Valsad"];
  var Haryana = ["Ambala","Bhiwani","Charkhi Dadri","Faridabad","Fatehabad","Gurugram","Hisar","Jhajjar","Jind","Kaithal","Karnal","Kurukshetra","Mahendragarh","Mewat","Palwal","Panchkula","Panipat","Rewari","Rohtak","Sirsa","Sonipat","Yamunanagar"];
  var HimachalPradesh = ["Bilaspur","Chamba","Hamirpur","Kangra","Kinnaur","Kullu","Lahaul Spiti","Mandi","Shimla","Sirmaur","Solan","Una"];
  var JammuKashmir = ["Anantnag","Bandipora","Baramulla","Budgam","Doda","Ganderbal","Jammu","Kargil","Kathua","Kishtwar","Kulgam","Kupwara","Leh","Poonch","Pulwama","Rajouri","Ramban","Reasi","Samba","Shopian","Srinagar","Udhampur"];
  var Jharkhand = ["Bokaro","Chatra","Deoghar","Dhanbad","Dumka","East Singhbhum","Garhwa","Giridih","Godda","Gumla","Hazaribagh","Jamtara","Khunti","Koderma","Latehar","Lohardaga","Pakur","Palamu","Ramgarh","Ranchi","Sahebganj","Seraikela Kharsawan","Simdega","West Singhbhum"];
  var Karnataka = ["Bagalkot","Bangalore Rural","Bangalore Urban","Belgaum","Bellary","Bidar","Vijayapura","Chamarajanagar","Chikkaballapur","Chikkamagaluru","Chitradurga","Dakshina Kannada","Davanagere","Dharwad","Gadag","Gulbarga","Hassan","Haveri","Kodagu","Kolar","Koppal","Mandya","Mysore","Raichur","Ramanagara","Shimoga","Tumkur","Udupi","Uttara Kannada","Yadgir"];
  var Kerala = ["Alappuzha","Ernakulam","Idukki","Kannur","Kasaragod","Kollam","Kottayam","Kozhikode","Malappuram","Palakkad","Pathanamthitta","Thiruvananthapuram","Thrissur","Wayanad"];
  var MadhyaPradesh = ["Agar Malwa","Alirajpur","Anuppur","Ashoknagar","Balaghat","Barwani","Betul","Bhind","Bhopal","Burhanpur","Chhatarpur","Chhindwara","Damoh","Datia","Dewas","Dhar","Dindori","Guna","Gwalior","Harda","Hoshangabad","Indore","Jabalpur","Jhabua","Katni","Khandwa","Khargone","Mandla","Mandsaur","Morena","Narsinghpur","Neemuch","Panna","Raisen","Rajgarh","Ratlam","Rewa","Sagar","Satna",
    "Sehore","Seoni","Shahdol","Shajapur","Sheopur","Shivpuri","Sidhi","Singrauli","Tikamgarh","Ujjain","Umaria","Vidisha"];
  var Maharashtra = ["Ahmednagar","Akola","Amravati","Aurangabad","Beed","Bhandara","Buldhana","Chandrapur","Dhule","Gadchiroli","Gondia","Hingoli","Jalgaon","Jalna","Kolhapur","Latur","Mumbai City","Mumbai Suburban","Nagpur","Nanded","Nandurbar","Nashik","Osmanabad","Palghar","Parbhani","Pune","Raigad","Ratnagiri","Sangli","Satara","Sindhudurg","Solapur","Thane","Wardha","Washim","Yavatmal"];
  var Manipur = ["Bishnupur","Chandel","Churachandpur","Imphal East","Imphal West","Jiribam","Kakching","Kamjong","Kangpokpi","Noney","Pherzawl","Senapati","Tamenglong","Tengnoupal","Thoubal","Ukhrul"];
  var Meghalaya = ["East Garo Hills","East Jaintia Hills","East Khasi Hills","North Garo Hills","Ri Bhoi","South Garo Hills","South West Garo Hills","South West Khasi Hills","West Garo Hills","West Jaintia Hills","West Khasi Hills"];
  var Mizoram = ["Aizawl","Champhai","Kolasib","Lawngtlai","Lunglei","Mamit","Saiha","Serchhip","Aizawl","Champhai","Kolasib","Lawngtlai","Lunglei","Mamit","Saiha","Serchhip"];
  var Nagaland = ["Dimapur","Kiphire","Kohima","Longleng","Mokokchung","Mon","Peren","Phek","Tuensang","Wokha","Zunheboto"];
  var Odisha = ["Angul","Balangir","Balasore","Bargarh","Bhadrak","Boudh","Cuttack","Debagarh","Dhenkanal","Gajapati","Ganjam","Jagatsinghpur","Jajpur","Jharsuguda","Kalahandi","Kandhamal","Kendrapara","Kendujhar","Khordha","Koraput","Malkangiri","Mayurbhanj","Nabarangpur","Nayagarh","Nuapada","Puri","Rayagada","Sambalpur","Subarnapur","Sundergarh"];
  var Punjab = ["Amritsar","Barnala","Bathinda","Faridkot","Fatehgarh Sahib","Fazilka","Firozpur","Gurdaspur","Hoshiarpur","Jalandhar","Kapurthala","Ludhiana","Mansa","Moga","Mohali","Muktsar","Pathankot","Patiala","Rupnagar","Sangrur","Shaheed Bhagat Singh Nagar","Tarn Taran"];
  var Rajasthan = ["Ajmer","Alwar","Banswara","Baran","Barmer","Bharatpur","Bhilwara","Bikaner","Bundi","Chittorgarh","Churu","Dausa","Dholpur","Dungarpur","Ganganagar","Hanumangarh","Jaipur","Jaisalmer","Jalore","Jhalawar","Jhunjhunu","Jodhpur","Karauli","Kota","Nagaur","Pali","Pratapgarh","Rajsamand","Sawai Madhopur","Sikar","Sirohi","Tonk","Udaipur"];
  var Sikkim = ["East Sikkim","North Sikkim","South Sikkim","West Sikkim"];
  var TamilNadu = ["Ariyalur","Chennai","Coimbatore","Cuddalore","Dharmapuri","Dindigul","Erode","Kanchipuram","Kanyakumari","Karur","Krishnagiri","Madurai","Nagapattinam","Namakkal","Nilgiris","Perambalur","Pudukkottai","Ramanathapuram","Salem","Sivaganga","Thanjavur","Theni","Thoothukudi","Tiruchirappalli","Tirunelveli","Tiruppur","Tiruvallur","Tiruvannamalai","Tiruvarur","Vellore","Viluppuram","Virudhunagar"];
  var Telangana = ["Adilabad","Bhadradri Kothagudem","Hyderabad","Jagtial","Jangaon","Jayashankar","Jogulamba","Kamareddy","Karimnagar","Khammam","Komaram Bheem","Mahabubabad","Mahbubnagar","Mancherial","Medak","Medchal","Nagarkurnool","Nalgonda","Nirmal","Nizamabad","Peddapalli","Rajanna Sircilla","Ranga Reddy","Sangareddy","Siddipet","Suryapet","Vikarabad","Wanaparthy","Warangal Rural","Warangal Urban","Yadadri Bhuvanagiri"];
  var Tripura = ["Dhalai","Gomati","Khowai","North Tripura","Sepahijala","South Tripura","Unakoti","West Tripura"];
  var UttarPradesh = ["Agra","Aligarh","Allahabad","Ambedkar Nagar","Amethi","Amroha","Auraiya","Azamgarh","Baghpat","Bahraich","Ballia","Balrampur","Banda","Barabanki","Bareilly","Basti","Bhadohi","Bijnor","Budaun","Bulandshahr","Chandauli","Chitrakoot","Deoria","Etah","Etawah","Faizabad","Farrukhabad","Fatehpur","Firozabad","Gautam Buddha Nagar","Ghaziabad","Ghazipur","Gonda","Gorakhpur","Hamirpur","Hapur","Hardoi","Hathras","Jalaun","Jaunpur","Jhansi","Kannauj","Kanpur Dehat","Kanpur Nagar","Kasganj","Kaushambi","Kheri","Kushinagar","Lalitpur","Lucknow","Maharajganj","Mahoba","Mainpuri","Mathura","Mau","Meerut","Mirzapur","Moradabad","Muzaffarnagar","Pilibhit","Pratapgarh","Raebareli","Rampur","Saharanpur","Sambhal","Sant Kabir Nagar","Shahjahanpur","Shamli","Shravasti","Siddharthnagar","Sitapur","Sonbhadra","Sultanpur","Unnao","Varanasi"];
  var Uttarakhand  = ["Almora","Bageshwar","Chamoli","Champawat","Dehradun","Haridwar","Nainital","Pauri","Pithoragarh","Rudraprayag","Tehri","Udham Singh Nagar","Uttarkashi"];
  var WestBengal = ["Alipurduar","Bankura","Birbhum","Cooch Behar","Dakshin Dinajpur","Darjeeling","Hooghly","Howrah","Jalpaiguri","Jhargram","Kalimpong","Kolkata","Malda","Murshidabad","Nadia","North 24 Parganas","Paschim Bardhaman","Paschim Medinipur","Purba Bardhaman","Purba Medinipur","Purulia","South 24 Parganas","Uttar Dinajpur"];
  var AndamanNicobar = ["Nicobar","North Middle Andaman","South Andaman"];
  var Chandigarh = ["Chandigarh"];
  var DadraHaveli = ["Dadra Nagar Haveli"];
  var DamanDiu = ["Daman","Diu"];
  var Delhi = ["Central Delhi","East Delhi","New Delhi","North Delhi","North East Delhi","North West Delhi","Shahdara","South Delhi","South East Delhi","South West Delhi","West Delhi"];
  var Lakshadweep = ["Lakshadweep"];
  var Puducherry = ["Karaikal","Mahe","Puducherry","Yanam"];



  $("#inputState").change(function(){
    var StateSelected = $(this).val();
    var optionsList;
    var htmlString = "";
    switch (StateSelected) {
      case "Andra Pradesh":
        optionsList = AndraPradesh;
        break;
      case "Arunachal Pradesh":
        optionsList = ArunachalPradesh;
        break;
      case "Assam":
        optionsList = Assam;
        break;
      case "Bihar":
        optionsList = Bihar;
        break;
      case "Chhattisgarh":
        optionsList = Chhattisgarh;
        break;
      case "Goa":
        optionsList = Goa;
        break;
      case  "Gujarat":
        optionsList = Gujarat;
        break;
      case "Haryana":
        optionsList = Haryana;
        break;
      case "Himachal Pradesh":
        optionsList = HimachalPradesh;
        break;
      case "Jammu and Kashmir":
        optionsList = JammuKashmir;
        break;
      case "Jharkhand":
        optionsList = Jharkhand;
        break;
      case  "Karnataka":
        optionsList = Karnataka;
        break;
      case "Kerala":
        optionsList = Kerala;
        break;
      case  "Madya Pradesh":
        optionsList = MadhyaPradesh;
        break;
      case "Maharashtra":
        optionsList = Maharashtra;
        break;
      case  "Manipur":
        optionsList = Manipur;
        break;
      case "Meghalaya":
        optionsList = Meghalaya ;
        break;
      case  "Mizoram":
        optionsList = Mizoram;
        break;
      case "Nagaland":
        optionsList = Nagaland;
        break;
      case  "Odisha":
        optionsList = Odisha;
        break;
      case "Punjab":
        optionsList = Punjab;
        break;
      case  "Rajasthan":
        optionsList = Rajasthan;
        break;
      case "Sikkim":
        optionsList = Sikkim;
        break;
      case  "Tamil Nadu":
        optionsList = TamilNadu;
        break;
      case  "Telangana":
        optionsList = Telangana;
        break;
      case "Tripura":
        optionsList = Tripura ;
        break;
      case  "Uttarakhand":
        optionsList = Uttarakhand;
        break;
      case  "Uttar Pradesh":
        optionsList = UttarPradesh;
        break;
      case "West Bengal":
        optionsList = WestBengal;
        break;
      case  "Andaman and Nicobar Islands":
        optionsList = AndamanNicobar;
        break;
      case "Chandigarh":
        optionsList = Chandigarh;
        break;
      case  "Dadar and Nagar Haveli":
        optionsList = DadraHaveli;
        break;
      case "Daman and Diu":
        optionsList = DamanDiu;
        break;
      case  "Delhi":
        optionsList = Delhi;
        break;
      case "Lakshadweep":
        optionsList = Lakshadweep ;
        break;
      case  "Pondicherry":
        optionsList = Puducherry;
        break;
    }


    for(var i = 0; i < optionsList.length; i++){
      htmlString = htmlString+"<option value='"+ optionsList[i] +"'>"+ optionsList[i] +"</option>";
    }
    $("#inputDistrict").html(htmlString);

  });

  return (
      <div className="auth-form-container">
        <div style={{textAlign:"center"}}>
          <h2>Register</h2>
        </div>

          <Form>
            <Row>
              <Form.Label htmlFor="name">Name</Form.Label>
              <Form.Control
                  required
                  type="text"
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="full name"
              />
            </Row>

            <div style={{margin:"10px",textAlign:"center"}}>
            <Form.Label htmlFor="gender">Gender</Form.Label>

            <input
                required
                type="radio"
                id="gender"
                name="gender"
                value="Male"
                onChange={(event) => setGender(event.target.value)}
                style={{margin:"10px"}}

            />
            Male

            <input
                required
                type="radio"
                id="gender"
                name="gender"
                value="Female"
                onChange={(event) => setGender(event.target.value)}
                style={{margin:"10px"}}
            />

            Female
            </div>

            <Row>
              <Col>
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control
                  required
                  type="text"
                  id="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="username"
              />

              </Col>

              <Col>


              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                  required
                  type="password"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="password"
              />
              </Col>
            </Row>

            <Row>
              <Form.Label htmlFor="address">Address</Form.Label>
              <Form.Control
                  required
                  type="text"
                  id="address"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder="address"
              />

            </Row>

            <Row>
              <Col>
                <Form.Label htmlFor="state">State</Form.Label>
                <Form.Select
                    class="form-control"
                    id="inputState"
                    name="state"
                    value={state}
                    onChange={(event) => setState(event.target.value)}>
                  <option value="SelectState">Select State</option>
                  <option value="Andra Pradesh">Andra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madya Pradesh">Madya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="West Bengal">West Bengal</option>
                  <option disabled={true}>UNION Territories</option>
                  <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                  <option value="Daman and Diu">Daman and Diu</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Pondicherry">Pondicherry</option>
                </Form.Select>

              </Col>
              <Col>
                <Form.Label htmlFor="district">District</Form.Label>
                <Form.Select
                    class="form-control"
                    id="inputDistrict"
                    name="district"
                    value={district} onChange={(event) => setDistrict(event.target.value)}>
                  <option value="">-- select one -- </option>
                </Form.Select>

              </Col>

            </Row>

              <Form.Label htmlFor="mobilenumber">Mobile number:</Form.Label>
              <Form.Control
                  required
                  type="tel"
                  id="mobilenumber"
                  value={mobilenumber}
                  onChange={(event) => setMobilenumber(event.target.value)}
              />

            <div style={{textAlign:"center",margin:"10px",padding:"5px"}}>
              <Button variant="outline-primary"  onClick={handleSubmit}>Register</Button>
            </div>

          </Form>

        <Row>
        <button className="link-btn" onClick={() => navigate('/')}>Already have an account? Login here.</button>
        </Row>
      </div>
  )
}

export default Register


