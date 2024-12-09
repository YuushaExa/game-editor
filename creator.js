let jsonData = {
    "episode": "1",
    "title": "The Beginning",
    "scenes": []
};

function renderCreator() {
    const creator = document.getElementById('creator');
    creator.innerHTML = '';

    jsonData.scenes.forEach(scene => {
        const sceneDiv = document.createElement('div');
        sceneDiv.className = 'scene';
        sceneDiv.innerHTML = `
            <h3>Scene ID: ${scene.id}</h3>
            <label>Text: <input type="text" value="${scene.text}" onchange="updateSceneText('${scene.id}', this.value)"></label>
            <div>Choices:</div>
        `;

        scene.choices.forEach(choice => {
            const choiceDiv = document.createElement('div');
            choiceDiv.className = 'choice';
            choiceDiv.innerHTML = `
                <label>Choice Text: <input type="text" value="${choice.text}" onchange="updateChoiceText('${scene.id}', '${choice.text}', this.value)"></label>
                <label>Next Scene: <input type="text" value="${choice.nextScene}" onchange="updateChoiceNextScene('${scene.id}', '${choice.text}', this.value)"></label>
            `;
            sceneDiv.appendChild(choiceDiv);
        });

        creator.appendChild(sceneDiv);
    });
}

function updateSceneText(sceneId, newText) {
    const scene = jsonData.scenes.find(s => s.id === sceneId);
    if (scene) {
        scene.text = newText;
    }
}

function updateChoiceText(sceneId, oldText, newText) {
    const scene = jsonData.scenes.find(s => s.id === sceneId);
    const choice = scene.choices.find(c => c.text === oldText);
    if (choice) {
        choice.text = newText;
    }
}

function updateChoiceNextScene(sceneId, oldText, newNextScene) {
    const scene = jsonData.scenes.find(s => s.id === sceneId);
    const choice = scene.choices.find(c => c.text === oldText);
    if (choice) {
        choice.nextScene = newNextScene;
    }
}

document.getElementById('loadJson').addEventListener('click', () => {
    const userInput = prompt("Please enter your JSON data:");
    try {
        jsonData = JSON.parse(userInput);
        renderCreator();
    } catch (error) {
        alert("Invalid JSON format. Please try again.");
    }
});

document.getElementById('addScene').addEventListener('click', () => {
    const newSceneId = `scene${jsonData.scenes.length + 1}`;
    const newScene = {
        id: newSceneId,
        text: "New scene text here.",
        choices: []
    };
    jsonData.scenes.push(newScene);
    renderCreator();
});

document.getElementById('save').addEventListener('click', () => {
    document.getElementById('output').textContent = JSON.stringify(jsonData, null, 2);
});

// Initial render of the creator
renderCreator();
