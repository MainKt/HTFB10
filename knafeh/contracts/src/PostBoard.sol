// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IProfile {
    struct UserProfile {
        string displayName;
        string bio;
    }

    function updateProfile(
        string memory _displayName,
        string memory _bio
    ) external;

    function setProfile(
        string memory _displayName,
        string memory _bio
    ) external;

    function getProfile(
        address _user
    ) external view returns (UserProfile memory);
}

contract PostBoard {
    address owner;
    modifier onlyOwner() {
        require(msg.sender == owner, "ONLY OWNER");
        _;
    }

    struct Profile {
        string displayName;
        string bio;
    }
    uint16 public MAX_POST_LENGTH = 280;

    struct Post {
        uint256 id;
        address author;
        string content;
        uint256 timestamp;
        uint256 likes;
        string media;
    }
    mapping(address => Post[]) public posts;

    event PostCreated(
        uint256 id,
        address author,
        string displayName,
        string content,
        uint256 timestamp
    );
    event PostLiked(
        address liker,
        address postAuthor,
        uint256 postId,
        uint256 newLikeCount
    );
    event PostUnliked(
        address unliker,
        address postAuthor,
        uint256 postId,
        uint256 newLikeCount
    );
    event ProfileUpdated(address user, string displayName, string bio);

    IProfile profileContract;
    constructor(address _profileContract) {
        owner = msg.sender;
        profileContract = IProfile(_profileContract);
    }

    function changePostLength(uint16 newPostLength) public onlyOwner {
        MAX_POST_LENGTH = newPostLength;
    }

    function getTotalLikes(address _author) external view returns (uint) {
        uint totalLikes;

        for (uint i = 0; i < posts[_author].length; i++) {
            totalLikes += posts[_author][i].likes;
        }

        return totalLikes;
    }

    function toString(address _addr) internal pure returns (string memory) {
        bytes32 value = bytes32(uint256(uint160(_addr)));
        bytes memory alphabet = "0123456789abcdef";

        bytes memory str = new bytes(42);
        str[0] = "0";
        str[1] = "x";

        for (uint256 i = 0; i < 20; i++) {
            str[2 + i * 2] = alphabet[uint8(value[i + 12] >> 4)];
            str[3 + i * 2] = alphabet[uint8(value[i + 12] & 0x0f)];
        }

        return string(str);
    }

    function createPost(string memory _post) public {
        require(bytes(_post).length <= MAX_POST_LENGTH, "Post is too long!");

        IProfile.UserProfile memory userProfileTemp = profileContract
            .getProfile(msg.sender);
        if (bytes(userProfileTemp.displayName).length == 0) {
            profileContract.setProfile(
                toString(msg.sender),
                "Tell us something about yourself"
            );
            emit ProfileUpdated(
                msg.sender,
                toString(msg.sender),
                "Tell us something about yourself"
            );
        }

        Post memory newPost = Post({
            id: posts[msg.sender].length,
            author: msg.sender,
            content: _post,
            timestamp: block.timestamp,
            likes: 0,
            media: ""
        });

        posts[msg.sender].push(newPost);

        // Emit the PostCreated event
        emit PostCreated(
            newPost.id,
            newPost.author,
            userProfileTemp.displayName,
            _post,
            newPost.timestamp
        );
    }

    function likePost(address author, uint256 id) external {
        require(posts[author][id].id == id, "POST DOES NOT EXIST");

        posts[author][id].likes++;

        // Emit the PostLiked event
        emit PostLiked(msg.sender, author, id, posts[author][id].likes);
    }

    function unlikePost(address author, uint256 id) external {
        require(posts[author][id].id == id, "POST DOES NOT EXIST");
        require(posts[author][id].likes > 0, "POST HAS NO LIKES");

        posts[author][id].likes--;

        emit PostUnliked(msg.sender, author, id, posts[author][id].likes);
    }

    function getPost(uint _i) public view returns (Post memory) {
        return posts[msg.sender][_i];
    }

    function getAllPosts(address _owner) public view returns (Post[] memory) {
        return posts[_owner];
    }

    function updateProfile(
        string memory _displayName,
        string memory _bio
    ) public {
        profileContract.updateProfile(_displayName, _bio);
        emit ProfileUpdated(msg.sender, _displayName, _bio);
    }

    function getProfile() external view returns (IProfile.UserProfile memory) {
        return profileContract.getProfile(msg.sender);
    }
}
