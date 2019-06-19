import React,{Fragment } from "react";
import { DatePicker } from "antd";
import { Dropdown } from "semantic-ui-react";
import { MDBInput } from "mdbreact";
const countryOptions = [
    { text: "Ariana", key: "Ariana", value: "Ariana" },
    { text: "Béja", key: "Béja", value: "Béja" },
    { text: "Ben Arous", key: "Ben Arous", value: "Ben Arous" },
    { text: "Bizerte", key: "Bizerte", value: "Bizerte" },
    { text: "Gabès", key: "Gabès", value: "Gabès" },
    { text: "Gafsa", key: "Gafsa", value: "Gafsa" },
    { text: "Jendouba", key: "Jendouba", value: "Jendouba" },
    { text: "Kairouan", key: "Kairouan", value: "Kairouan" },
    { text: "Kasserine", key: "Kasserine", value: "Kasserine" },
    { text: "Kebili", key: "Kebili", value: "Kebili" },
    { text: "kef", key: "kef", value: "kef" },
    { text: "Mahdia", key: "Mahdia", value: "Mahdia" },
    { text: "Manouba", key: "Manouba", value: "Manouba" },
    { text: "Medenine", key: "Medenine", value: "Medenine" },
    { text: "Monastir", key: "", value: "" },
    { text: "Nabeul", key: "Nabeul", value: "Nabeul" },
    { text: "Sfax", key: "Sfax", value: "Sfax" },
    { text: "Sidi Bouzid", key: "Sidi Bouzid", value: "Sidi Bouzid" },
    { text: "Siliana", key: "Siliana", value: "Siliana" },
    { text: "Sousse", key: "Sousse", value: "Sousse" },
    { text: "Tataouine", key: "Tataouine", value: "Tataouine" },
    { text: "Tozeur", key: "Tozeur", value: "Tozeur" },
    { text: "Tunis", key: "Tunis", value: "Tunis" },
    { text: "Zaghouan", key: "Zaghouan", value: "Zaghouan" }
  ];
  const categoriesOptions = [
    { text: "Camping", key: "Camping", value: "Camping" },
    { text: "Dinner", key: "Dinner", value: "Dinner" },
    { text: "Jogging", key: "Jogging", value: "Jogging" },
    { text: "Meeting", key: "Meeting", value: "Meeting" }
  ];
  const { RangePicker } = DatePicker;
 
export default function eventCreateForm() {
    return (
        <Fragment>
        <form className="mt-4" onSubmit={this.onSubmit} >
          <div className="container event-create">
            <div className="row event-create-container">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-12">
                    <div class="form-group">
                      <label htmlFor="exampleInputEmail1 ">Event Title</label>
                      <MDBInput label="Event name" size="lg" />
                    </div>
                    <RangePicker
                      className="col-md-12 mt-4"
                      showTime={{ format: "HH:mm" }}
                      format="YYYY-MM-DD HH:mm"
                      placeholder={["Start Time", "End Time"]}
                      
                      id="timeInterval"
                    />
                    <Dropdown
                      className="col-md-12 mt-4"
                      placeholder="Select Region"
                      fluid
                      search
                      selection
                      options={categoriesOptions}
                    />
                    <Dropdown
                      className="col-md-12 mt-4"
                      placeholder="Event Categorie"
                      fluid
                      search
                      selection
                      options={categoriesOptions}


                    />
                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1">
                        Event Description
                      </label>
                      <MDBInput type="textarea" label="Example label" size="lg" outline />

                    </div>
                    <div className="upload-container">
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="customFile"
                          onChange={this.handleChange}
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFile"
                        >
                          {this.state.imageName}
                        </label>
                      </div>
                      <input
                        type="submit"
                        value="upload"
                        className="btn btn-primary btn-block mt-4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )
        </form>
      </Fragment>
    )
}

  // onSubmit = async e => {
  //   e.preventDefault();
  //   const formData = new FormData();

  //   formData.append("imageUp", this.state.image);
    
  //     const res = await axios.post("http://localhost:4000/upload", formData);
  //     const { fileName, filePath } = res.data;
  //     this.setState({
  //       imageUploaded: { fileName, filePath }
  //     });
  //     axios.post("http://localhost:4000/newevent", {
  //         EventTitle:this.state.EventTitle,
  //         Imagename:fileName,
  //         ImagePath:filePath,
  //         Categorie:this.state.selectedCategorie,
  //         Region:this.state.selectedRegion,
  //         Description:this.state.EventDesc,
  //         EventTime:this.state.slectedTime



  //     })
  //       .then(res => console.log("image sayer fi bd "));
    
  // };


//   constructor(props) {
//     super(props);
//     this.state = {
//       slectedTime: {},
//       selectedRegion: "Tunis",
//       selectedCategorie: "Camping",
//       EventTitle: "",
//       EventDesc: "",
//       image:'',
//       imageName:'Choose Image',
//       imageUploaded:{}
//     };
//   }

//   handleAllinputs = e => {
//     this.setState({
//       [e.target.name]: e.target.value
//     });
//   };
//   changeTime = (value, dateString) => {
//     this.setState({
//       slectedTime: {
//         startdate: dateString[0].slice(0, 10),
//         endDate: dateString[1].slice(0, 10),
//         startTime: dateString[0].slice(10, 16),
//         endTime: dateString[1].slice(10, 16)
//       }
//     });
//   };
//   handleChangeRegion = (event, data) => {
//     const { value } = data;
//     const { text } = data.options.find(o => o.value === value);
//     console.log(text);
//     console.log(value);
//     this.setState({
//       selectedRegion: text
//     });
//   };
//   handleChangeCategorie = (event, data) => {
//     const { value } = data;
//     const { text } = data.options.find(o => o.value === value);
//     console.log(text);
//     console.log(value);
//     this.setState({
//       selectedCategorie: text
//     });
//   };

//   //upload methods here
//   handleChange = e => {
//     this.setState({
//       image: e.target.files[0],
//       imageName: e.target.files[0].name
//     });
//   };