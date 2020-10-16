import axios from 'axios';
import { handleDelete } from './deleteComment';

const addCommentForm = document.getElementById('jsAddComment');
const commentList = document.getElementById('jsCommentList');
const commentNumber = document.getElementById('jsCommentNumber');

function increaseNumber() {
	commentNumber.innerText = parseInt(commentNumber.innerText, 10) + 1;
}

function addComment(comment, newId) {
	const li = document.createElement('li');
	li.innerHTML = `
		<span>${comment}</span>
		<span>
			<i class="fas fa-times delete-comment-icon" data-src=${newId}></i>
		</span>
	`;
	li.addEventListener('click', handleDelete);
	commentList.prepend(li);
	increaseNumber();
}

async function sendComment(comment) {
	const videoId = window.location.href.split('/videos/')[1];
	const response = await axios({
		url: `/api/${videoId}/comment`,
		method: 'POST',
		data: {
			comment,
		},
	});
	if (response.status === 200) {
		addComment(comment, response.data.id);
	}
}

function handleSubmit(e) {
	e.preventDefault();
	const commentInput = addCommentForm.querySelector('input');
	const comment = commentInput.value;
	sendComment(comment);
	commentInput.value = '';
}

function init() {
	addCommentForm.addEventListener('submit', handleSubmit);
}

if (addCommentForm) {
	init();
}
