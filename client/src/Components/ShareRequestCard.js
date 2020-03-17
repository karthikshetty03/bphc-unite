import React from "react";
import moment from "moment"
import axios from "axios";
import { connect } from "react-redux";

class ShareRequestCard extends React.Component {
    constructor(props) {
        super(props);
        this.onSend = this.onAccept.bind(this);
    }
    onAccept() {
        // const sharing = {
        //     requestor: this.props.user.name,
        //     requestee: this.props.requesterName
        // };
        // console.log(sharing);
        // axios
        //     .post("/api/share/request", sharing)
        //     .then(res => {
        //         console.log(res.data);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    }

    render() {
        const dateobj = moment(this.props.dateofrequest);
        var newDateObj = moment(dateobj).toDate();
        var date = moment(newDateObj).format("DD/MM/YY");
        var time = moment(newDateObj).format("HH:mm");
        return (
            <div>
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">{this.props.requesterName} wants to ride with you</p>
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
                            <br />
                            <b>Message :</b>
                            {this.props.message}
                            <br />

                        </div>
                    </div>
                    <footer class="card-footer">
                        <a
                            href="#"
                            class="card-footer-item has-text-primary"
                            onClick={this.onAccept}
                        >
                            Accept
            </a>
                        {/* <a href="#" class="card-footer-item">Edit</a>
                <a href="#" class="card-footer-item">Delete</a> */}
                        <a
                            href="#"
                            class="card-footer-item has-text-primary"
                            onClick={this.onAccept}
                        >
                            Reject
            </a>
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

export default connect(mapStateToProps)(ShareRequestCard);