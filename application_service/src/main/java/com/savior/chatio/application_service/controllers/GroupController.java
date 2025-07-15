package com.savior.chatio.application_service.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.savior.chatio.application_service.models.Group;
import com.savior.chatio.application_service.requests.GroupCreateRequest;
import com.savior.chatio.application_service.requests.GroupJoinRequest;
import com.savior.chatio.application_service.requests.GroupUpdateRequest;
import com.savior.chatio.application_service.requests.MemberGroupRequest;
import com.savior.chatio.application_service.services.GroupService;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/group")
public class GroupController {

    @Autowired
    private GroupService groupService;
    
    @GetMapping("")
    public Set<Group> getUsersGroups(@RequestHeader("uid") int userId, @RequestHeader("role") String role) {
        List<Group> groupList = groupService.getGroupsByUser(userId);
        groupList.addAll(groupService.getGroupsByCreator(userId));
        return Set.copyOf(groupList);
    }

    @PostMapping("")
    public Group createNewGroup(@RequestBody GroupCreateRequest request, @RequestHeader("uid") int userId, @RequestHeader("role") String role) {
        return groupService.createGroup(request.getName(), request.getDescription(), userId, request.getMembers());
    }

    @PutMapping("/{id}")
    public Optional<Group> updateGroupDetails(@PathVariable String id, @RequestBody GroupUpdateRequest request, @RequestHeader("uid") int userId, @RequestHeader("role") String role) {
        if (!groupService.isGroupCreator(Integer.parseInt(id), userId) && !role.equals("ADMIN") && !role.equals("SYSTEM")) {
            return Optional.empty();
        }
        return groupService.updateGroup(Integer.parseInt(id), request.getName(), request.getDescription());
    }
    
    @DeleteMapping("/{id}")
    public Optional<Group> deleteGroup(@PathVariable String id, @RequestHeader("uid") int userId, @RequestHeader("role") String role) {
        if (!groupService.isGroupCreator(Integer.parseInt(id), userId) && !role.equals("ADMIN") && !role.equals("SYSTEM")) {
            return Optional.empty();
        }
        return groupService.deleteGroup(Integer.parseInt(id));
    }

    @PostMapping("/{id}/add")
    public Optional<Group> addUserToGroup(@PathVariable String id, @RequestBody MemberGroupRequest request, @RequestHeader("uid") int userId, @RequestHeader("role") String role) {
        if (!groupService.isGroupCreator(Integer.parseInt(id), userId) && !role.equals("ADMIN") && !role.equals("SYSTEM")) {
            return Optional.empty();
        }
        return groupService.addToGroup(Integer.parseInt(id), request.getUserId());
    }

    @DeleteMapping("/{id}/remove")
    public Optional<Group> removeUserFromGroup(@PathVariable String id, @RequestBody MemberGroupRequest request, @RequestHeader("uid") int userId, @RequestHeader("role") String role) {
        if (!groupService.isGroupCreator(Integer.parseInt(id), userId) && !role.equals("ADMIN") && !role.equals("SYSTEM")) {
            return Optional.empty();
        }
        return groupService.removeFromGroup(Integer.parseInt(id), request.getUserId());
    }
    
    @PostMapping("/{id}/join")
    public Optional<Group> joinGroup(@PathVariable String id, @RequestBody GroupJoinRequest request, @RequestHeader("uid") int userId) {
        if (groupService.isGroupMember(Integer.parseInt(id), userId)) {
            return Optional.empty();
        }
        return groupService.joinGroup(Integer.parseInt(id), userId, request.getJoinCode());
    }

    @PostMapping("/{id}/leave")
    public Optional<Group> leaveGroup(@PathVariable String id, @RequestHeader("uid") int userId, @RequestHeader("role") String role) {
        if (!groupService.isGroupMember(Integer.parseInt(id), userId)) {
            return Optional.empty();
        }
        return groupService.removeFromGroup(Integer.parseInt(id), userId);
    }
    
    @PostMapping("/{id}/regenerate")
    public Optional<Group> regenerateJoinCode(@PathVariable String id, @RequestHeader("uid") int userId, @RequestHeader("role") String role) {
        if (!groupService.isGroupCreator(Integer.parseInt(id), userId) && !role.equals("ADMIN") && !role.equals("SYSTEM")) {
            return Optional.empty();
        }
        return groupService.regenerateJoinCode(Integer.parseInt(id));
    }
}
