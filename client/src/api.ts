import { Comment, Post, User } from './interface/Schemas';

import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URI || '';

export async function addFollow(headers: { user: string; target: string }) {
  console.log(headers);
  return new Promise<object | Error>((resolve, reject) => {
    axios
      .get('/api/users/addFollow', { headers: headers })
      // TODO: update the redux store, inject the new follower
      .then((data: object) => resolve(data))
      .catch((err: Error) => reject(err));
  });
}

export async function removeFollow(headers: { user: string; target: string }) {
  return new Promise<object | Error>((resolve, reject) => {
    axios
      .get('/api/users/removeFollow', { headers: headers })
      // TODO: update the redux store remove the follower
      .then((data: object) => resolve(data))
      .catch((err: Error) => reject(err));
  });
}

export async function fetchPost(headers: { slug: string }) {
  return new Promise<Post | Error>((resolve, reject) => {
    axios
      .get('/api/posts/getPost', { headers: headers })
      .then((data) => resolve(data.data as Post))
      .catch((err) => reject(err));
  });
}

export async function likePost(headers: { slug: string; token: string }) {
  return new Promise<Post | Error>((resolve, reject) => {
    axios
      .get('/api/posts/like', { headers: headers })
      .then((data) => resolve(data.data as Post))
      .catch((err) => reject(err));
  });
}

export async function addComment(token: string, slug: string, comment: string) {
  return new Promise<Comment>((resolve, reject) => {
    axios
      .post('/api/posts/addCommentToPost', {
        token: token,
        slug: slug,
        body: comment,
      })
      .then((data) => resolve(data.data))
      .catch((err) => reject(err));
  });
}
