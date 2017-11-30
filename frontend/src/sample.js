<table id = "table">
      <tbody>
        <tr>
          <th>Name</th>
          <th>Score</th>
        </tr>
        {
          this.props.value.map(
                (item,index)=>{
                  return(
                    <tr key={index} id = "trpadding">
                        <th>{item.name}</th>
                        <th>{item.score}</th>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </tr>
                  )
                }
              )
        }
        <button id = "hsButton" className = "massive ui inverted button" onClick = {()=>{window.location = "/"}}> back to Menu </button>
      </tbody>
      </table>