/// (1)
// incase export default
import Action from "./classes/Action.js";
import ActionsManager from "./classes/ActionsManager.js";

// incase several exports
// import { Action } from "./classes/Action.js";



// פונקציה שמוגדרת בתוך מודול ונקראת ע"י קוד הטמל צריכה להיות מקושרת לווינדוו
window.addActionToManager = function () {
    // get data from form
    let type = document.getElementById("type").value;
    let description = document.getElementById("description").value;
    let amount = +document.getElementById("amount").value;

    // create the action object
    let action = new Action(type, description, amount);

    // add the action to actionsManager
    manager.addAction(action);
    showActionsInTable();
    // reset the form
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
};


window.deleteActionFromManager = function (actionId) {
    if (confirm("Are you sure?")) {
        manager.deleteAction(actionId);
        showActionsInTable();
    }
};


window.updateActionInManager = function (actionId) {
    let newAmount = prompt("Please Enter new amount: ");
    if (newAmount == null || newAmount == "") alert("Something went wrong");
    else {
        manager.updateAction(actionId, +newAmount);
        showActionsInTable();
    }
};


function showActionsInTable() {
    document.getElementById("actions").innerHTML = "";
    localStorage.setItem("actions", JSON.stringify(manager.actions));
    for (let action of manager.actions) {
        document.getElementById("actions").innerHTML += `<tr class=${action.type == "income" ? "text-light" : "text-danger"
            }> 
      <td class= "bg-dark">  ${action.description} </td>
      <td class= "bg-dark">  ${action.amount} </td>

        <td class= "bg-dark"> <a onclick="updateActionInManager(${action.id
            })"><i class="fa-solid fa-pen"></i> </a>  </td>

        <td class= "bg-dark"> <a onclick="deleteActionFromManager(${action.id
            })"><i class="fa-solid fa-xmark"></i> </a>  </td>
        </tr>`;
    }
}


let manager = new ActionsManager();
showActionsInTable();
