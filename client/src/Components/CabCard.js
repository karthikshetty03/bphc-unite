import React from "react";
import moment from "moment"
import axios from "axios";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class CabCard extends React.Component {
    constructor(props) {
        super(props);
        
        this.onSend = this.onSend.bind(this);
        this.state = {
            requests: [],count:0
        };
    }
   onSend() {
        
        axios.get("/api/counter/")
            .then(response => {
               const data= response.data.map((item, index) => {
                    if (item.Field === "Sharing") {
                       
                        return item.Counter
                    }
                });
                this.setState({ count: data[0] })

                const sharing = {
                    id: this.state.count + 1,
                    requestor: this.props.user.name,
                    requestee: this.props.requesterName,
                    msg: this.props.message,
                    date: this.props.dateofrequest,
                    from: this.props.from,
                    to: this.props.to,
                    status: "sent"
                };
                const str1 = JSON.stringify(sharing);
                var pos = str1.indexOf("requestor");
                var check1 = str1.slice(pos-1);
                console.log(check1)
                if (this.props.requesterName === this.props.user.name) {
                    toast.error("You cannot send a Request to yourself !", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
                else {
                    axios.get("/api/sharing")
                        .then((response) => {
                            const data = response.data;
                            var flag = 0
                            this.setState({ requests: data })
                            console.log(this.state.count)
                            data.map((item) => {

                                const str = JSON.stringify(item)

                                var pos = str.indexOf("requestor");
                                var check2 = str.slice(pos - 1)
                                console.log(check2)
                                if (check2 === check1 ) {
                                    
                                    flag = 1;

                                }
                                if(item.requesterName===this.props.user.name && item.status==="rejected")
                                {
                                    flag=1;
                                }
                            })
                            if (flag === 0) {
                               axios
                                    .post("/api/share/request", sharing)
                                    .then(res => {
                                        
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    });
                                toast.success("Request Sent !", {
                                    position: toast.POSITION.TOP_RIGHT
                                });
                                const updateCount = {
                                    Field: "Sharing",
                                }
                               axios.post("/api/counter/update",updateCount)

                            }
                            else{
                                toast.warn("You have already sent a Request !", {
                                    position: toast.POSITION.TOP_RIGHT
                                });
                            }
                        })
                        .catch((err) => console.log(err));

                }    
            })
            .catch(err => {
                console.log(err);
            });

       
    }

    render() {
        // const dateinfo = this.props.dateofrequest.split('T');
        // const date = dateinfo[0];
        // const time = dateinfo[1];
        // const dateobj = date.parse(this.props.dateofrequest);
        const dateobj = moment(this.props.dateofrequest);
        var newDateObj = moment(dateobj).toDate();
        var date = moment(newDateObj).format("DD/MM/YY");
        var time = moment(newDateObj).format("HH:mm");

        return (
            <div>
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">{this.props.requesterName}</p>
                        <a href="#" class="card-header-icon" aria-label="more options">
                            <span class="icon">
                                <i class="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </a>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            {this.props.message}
                            <br />
                            <time datetime="2016-1-1">
                                <b>Date :</b>
                                {date}
                            </time>
                            <br />
                            <time datetime="2016-1-1">
                                <b>Time :</b>
                                {time}
                            </time>
                            <br />
                            <b>From :</b>
                            {this.props.from}
                            <br />
                            <b>To :</b>
                            {this.props.to}
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a
                            href="#"
                            class="card-footer-item has-text-primary"
                            onClick={this.onSend}
                        >
                            Send Request
            </a>
                        {/* <a href="#" class="card-footer-item">Edit</a>
                <a href="#" class="card-footer-item">Delete</a> */}
                        <ToastContainer></ToastContainer>
                    </footer>
                </div>
                <br />
            </div>
        );

    }
}

const mapStateToProps = state => {
    return {
        user: state.auth
    };
};

export default connect(mapStateToProps)(CabCard);