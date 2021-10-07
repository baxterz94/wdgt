class Evaluations {
  constructor(){
    this.el = document.getElementsByClassName('mark-item');
    this.status = localStorage;
    this.inputName = document.getElementById('feedback_name');
    this.inputComment = document.getElementById('feedback_comment');
    this.btn = document.getElementById('btn');
  }

  click(param){
    if( param ){
      for(let i = 0; i < this.el.length; i++){
        this.el[i].onclick = (ev) => {
          let item = ev.target;
            ev.preventDefault();
            this.status.setItem('index', i);
            this.popup();
            this.state();
        }
      }
    }else{
      for(let i = 0; i < this.el.length; i++){
        this.el[i].onclick = null;
      }
    }
  }

  state(){
    let param = true;
      if(this.status.index){
        let index = this.status.index;
            for(let i = 0; i < this.el.length; i++){
              if( index == i ){
                this.el[i].classList.add('active');
              }else{
                this.el[i].classList.add('disabled');
              }
            }

        param = false;
        this.click(param);
        this.publishComments();
      }else{
        this.click(param);
      }
  }

  popup(){
    let popWindow = document.querySelector('.popup-back');
    let close = document.querySelector('.popup-close');
    let popContent = document.querySelector('.wrap-popup');
      //show popup
      if( this.status.index == 1 || this.status.index == 0 ){
        popWindow.classList.add('b-show');
      }

      //close window
      close.onclick = (ev) => {
        popWindow.classList.remove('b-show');
      }

      //event submit
      this.btn.onclick = (ev) => {
        ev.preventDefault();
          let message = {
            name: this.inputName.value,
            comments: this.inputComment.value
          };

          this.status.setItem('comments', JSON.stringify(message) );
          popContent.innerHTML = `<div class="complete-text"><strong>Спасибо</strong>, что оставили отзыв!</div>`;
          this.state();
      }

  }

  publishComments(){
    let boxComments = document.getElementById('comments');
    let template;
      if( this.status.comments ){
        let data = JSON.parse(this.status.comments);
          template = `<div class="box-comment">
                            <div class="box-comment-name">${data.name}</div>
                            <div class="box-comment-text">${data.comments}</div>
                          </div>`;

          boxComments.innerHTML = template;
      }

  }

  install(){
    this.state();
  }

}



document.addEventListener('DOMContentLoaded', function() {
  const widget = new Evaluations;
     widget.install();
}, false);
