let dogoRenderer;
let dogoForm;
let DogoFormClass;
let DogoListClass;

const handleDogo = (e) =>{
  e.preventDefault();

  $("dogoMessage").animate({width:'hide'},350);

  if($("dogoName").val() == '' || $("dogoBreed").val() == ''){
    handleError("Bork! all fields required");
    return false;
  }

  sendAjax('POST', $("#dogoForm").attr("action"), $("#dogoForm").serialize(), function(){
    dogoRenderer.loadDogosFromServer();
  });

  return false;
};

const renderDogo = function() {
  return(
    <form id="dogoForm"
      name="dogoForm"
      onSubmit={this.handleSubmit}
      action="/dogoMaker"
      method="POST"
      className="dogoForm"
      >
      

      <label htmlFor="name">Name: </label>
      <input id="dogoName" type="text" name="name" placeholder ="Dogo Name"/>
      <label htmlFor="breed"> Breed: </label>
      <input id="dogoBreed" type="text" name="breed" placeholder="Dogo Breed"/>
      <input type="hidden" name="_csrf" value={this.props.csrf}/>
      <input className=" makeDogoSubmit" type="submit" value="Make Dogo" />

    </form>
  );
};

const renderDogoList = function() {
  if(this.state.data.length === 0){
    return(
      <div className="dogoList">
        <h3 className="emptyDogo">No Dogos Yet</h3>
      </div>
    );
  }

  const dogoNodes = this.state.data.map(function(dogo){
    return(
      <div key={dogo._id} className="dogo">
        <img src="/assets/img/dogoface.jpeg" alt="dogo face" className="dogoFace" />
        <h3 className="dogoName"> Name: {dogo.name} </h3>
        <h3 className="dogoBreed"> Breed: {dogo.breed} </h3>
      </div>
    )
  });

  return (
    <div className="dogoList">
      {dogoNodes}
    </div>
  );
};

const dogoSetup = function(csrf) {
  DogoFormClass = React.createClass({
    handleSubmit: handleDogo,
    render: renderDogo,
  });

  DogoListClass = React.createClass({
    loadDogosFromServer: function(){
      sendAjax('GET', '/getDogos', null, function(data){
        this.setState({data:data.dogos});
      }.bind(this));
    },
    getInitialState: function(){
      return{data: []};
    },
    componentDidMount: function(){
      this.loadDogosFromServer();
    },
    render: renderDogoList
  });

  dogoForm = ReactDOM.render(
    <DogoFormClass csrf={csrf} />, document.querySelector("#makeDogo") 
  );

  dogoRenderer = ReactDOM.render(
    <DogoListClass />, document.querySelector("#dogos")
  );
};

const dogoGetToken = () =>{
  sendAjax('GET', '/getToken', null, (result) => {
    dogoSetup(result.csrfToken);
  });
};

$(document).ready(function(){
  dogoGetToken();
});