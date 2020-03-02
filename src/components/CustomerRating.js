import React, { Component } from 'react';
import Rating from 'react-rating';
import grayStar from '../imgs/gray_star.png';
import yellowStar from '../imgs/yellow_star.png';
import './CustomerRating.css';

class CustomerRating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 1,
      email: '',
      comment: '',
      status: false,
    };

    this.addEmail = this.addEmail.bind(this);
    this.addComment = this.addComment.bind(this);
    this.saveRating = this.saveRating.bind(this);
    this.changeRate = this.changeRate.bind(this);
    this.renderRatings = this.renderRatings.bind(this);
  }

  componentDidMount() {
    this.renderRatings();
  }

  addEmail(event) {
    const email = event.target;
    this.setState({ email: email.value });
  }

  addComment(event) {
    const comment = event.target;
    this.setState({ comment: comment.value });
  }

  changeRate(rate) {
    this.setState({ rating: rate });
  }

  saveRating() {
    const { email } = this.state;
    const validEmailRegex = RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);
    if (!email || !validEmailRegex.test(email)) return alert('Preencha com um e-mail válido');
    if (!localStorage.comments) {
      localStorage.setItem('comments', JSON.stringify([this.state]));
      this.setState({ status: true });
      return this.renderRatings();
    }
    const comments = JSON.parse(localStorage.getItem('comments'));
    localStorage.setItem('comments', JSON.stringify([...comments, this.state]));
    this.setState({ status: true });
    return this.renderRatings();
  }

  renderRatings() {
    const comments = JSON.parse(localStorage.getItem('comments'));
    console.log(this.state);
    if (!localStorage.comments) return false;
    return (
      comments.map((comment) => (
        <div>
          <div>
            <Rating
              readonly
              initialRating={comment.rating}
              emptySymbol={<img src={grayStar} className="icon rating_star" alt="gray star" />}
              fullSymbol={<img src={yellowStar} className="icon rating_star" alt="yellow star" />}
            />
          </div>
          <div>
            {comment.email}
          </div>
          <div>
            {comment.comment}
          </div>
        </div>
      ))
    );
  }

  render() {
    const { rating } = this.state;
    return (
      <section>
        <form>
          <div className="title"><h3>Avaliações</h3></div>
          <div>
            <label htmlFor="email">
              <input id="email" type="email" placeholder="Email" onChange={this.addEmail} />
            </label>
          </div>
          <div className="rating_stars">
            <Rating
              initialRating={rating}
              onChange={(rate) => this.changeRate(rate)}
              emptySymbol={<img src={grayStar} className="icon rating_star" alt="gray star" />}
              fullSymbol={<img src={yellowStar} className="icon rating_star" alt="yellow star" />}
            />
          </div>
          <div>
            <textarea onChange={this.addComment} />
          </div>
          <div>
            <button type="button" onClick={this.saveRating}>Avaliar</button>
          </div>
        </form>
        <section>{this.renderRatings()}</section>
      </section>
    );
  }
}

export default CustomerRating;
