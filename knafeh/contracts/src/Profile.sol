// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Profile {
    struct UserProfile {
        string displayName;
        string bio;
        string avatar;
    }

    mapping(address => UserProfile) public profiles;

    function setProfile(
        string memory _displayName,
        string memory _bio
    ) external {
        profiles[msg.sender] = UserProfile(_displayName, _bio, "");
    }

    function updateProfile(
        string memory _displayName,
        string memory _bio
    ) external {
        UserProfile storage profile = profiles[msg.sender];
        profile.displayName = _displayName;
        profile.bio = _bio;
    }

    function getProfile(
        address _user
    ) public view returns (UserProfile memory) {
        return profiles[_user];
    }
}
