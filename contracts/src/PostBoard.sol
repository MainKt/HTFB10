// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/Ownable.sol";

pragma solidity ^0.8.0;

interface IProfile {
    struct UserProfile {
        string displayName;
        string bio;
    }
    function getProfile (address _user) external view returns (UserProfile memory);
}

contract PostBoard is Ownable {

    uint16 public MAX_post_LENGTH = 280;

    struct Post {
        uint256 id;
        address author;
        string content;
        uint256 timestamp;
        uint256 likes;
    }
    mapping(address => Post[] ) public posts;
    // profile contract defined here 
    IProfile profileContract;

    // Define the events
    event PostCreated(uint256 id, address author, string content, uint256 timestamp);
    event PostLiked(address liker, address postAuthor, uint256 postId, uint256 newLikeCount);
    event PostUnliked(address unliker, address postAuthor, uint256 postId, uint256 newLikeCount);

    modifier onlyRegistered(){
        IProfile.UserProfile memory userProfileTemp = profileContract.getProfile(msg.sender);
        require(bytes(userProfileTemp.displayName).length > 0, "USER NOT REGISTERED");
        _;
    }

    constructor(address _profileContract) {
        profileContract = IProfile(_profileContract);
    }

    function changePostLength(uint16 newPostLength) public onlyOwner {
        MAX_post_LENGTH = newPostLength;
    }

    function getTotalLikes(address _author) external view returns(uint) {
        uint totalLikes;

        for( uint i = 0; i < posts[_author].length; i++){
            totalLikes += posts[_author][i].likes;
        }

        return totalLikes;
    }

    function createPost(string memory _post) public  onlyRegistered {
        require(bytes(_post).length <= MAX_post_LENGTH, "Post is too long bro!" );

        Post memory newPost = Post({
            id: posts[msg.sender].length,
            author: msg.sender,
            content: _post,
            timestamp: block.timestamp,
            likes: 0
        });

        posts[msg.sender].push(newPost);

        // Emit the PostCreated event
        emit PostCreated(newPost.id, newPost.author, newPost.content, newPost.timestamp);
    }

    function likePost(address author, uint256 id) external  onlyRegistered {  
        require(posts[author][id].id == id, "post DOES NOT EXIST");

        posts[author][id].likes++;

        // Emit the PostLiked event
        emit PostLiked(msg.sender, author, id, posts[author][id].likes);
    }

    function unlikePost(address author, uint256 id) external  onlyRegistered {
        require(posts[author][id].id == id, "post DOES NOT EXIST");
        require(posts[author][id].likes > 0, "post HAS NO LIKES");
        
        posts[author][id].likes--;

        emit PostUnliked(msg.sender, author, id, posts[author][id].likes );
    }

    function getPost( uint _i) public view returns (Post memory) {
        return posts[msg.sender][_i];
    }

    function getAllPosts(address _owner) public view returns (Post[] memory ){
        return posts[_owner];
    }
}