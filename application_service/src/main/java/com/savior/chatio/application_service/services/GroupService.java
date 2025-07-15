package com.savior.chatio.application_service.services;

import java.security.SecureRandom;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.savior.chatio.application_service.models.Group;
import com.savior.chatio.application_service.repositories.GroupRepository;

@Service
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;

    public GroupService(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    public Optional<Group> getGroupByJoinCode(String joinCode) {
        return groupRepository.findByJoinCode(joinCode);
    }

    public Group createGroup(String name, String description, int creator, Set<Integer> members){
        SecureRandom random = new SecureRandom();
        String joinCode = String.format("%08x", random.nextInt(0x10000000));
        members.add(creator);
        Group group = Group.builder()
            .name(name)
            .description(description)
            .joinCode(joinCode)
            .creator(creator)
            .members(members)
            .build();
        return groupRepository.save(group);
    }

    public Optional<Group> getGroupById(int id) {
        return groupRepository.findById(id);
    }

    public Optional<Group> addToGroup(int id, int userId) {
        Optional<Group> group = groupRepository.findById(id);
        if (group.isPresent()) {
            Group updatedGroup = group.get();
            updatedGroup.getMembers().add(userId);
            return Optional.of(groupRepository.save(updatedGroup));
        }
        return Optional.empty();
    }

    public Optional<Group> joinGroup(int id, int userId, String joinCode) {
        Optional<Group> group = groupRepository.findById(id);
        if (group.isPresent() && group.get().getJoinCode().equals(joinCode)) {
            Group updatedGroup = group.get();
            updatedGroup.getMembers().add(userId);
            return Optional.of(groupRepository.save(updatedGroup));
        }
        return Optional.empty();
    }

    public Optional<Group> removeFromGroup(int id, int userId) {
        Optional<Group> group = groupRepository.findById(id);
        if (group.isPresent()) {
            Group updatedGroup = group.get();
            updatedGroup.getMembers().remove(userId);
            return Optional.of(groupRepository.save(updatedGroup));
        }
        return Optional.empty();
    }

    public Optional<Group> deleteGroup(int id) {
        Optional<Group> group = groupRepository.findById(id);
        if (group.isPresent()) {
            Group updatedGroup = group.get();
            updatedGroup.setDeleted(true);
            return Optional.of(groupRepository.save(updatedGroup));
        }
        return Optional.empty();
    }

    public Optional<Group> updateGroup(int id, String name, String description) {
        Optional<Group> group = groupRepository.findById(id);
        if (group.isPresent()) {
            Group updatedGroup = group.get();
            updatedGroup.setName(name);
            updatedGroup.setDescription(description);
            return Optional.of(groupRepository.save(updatedGroup));
        }
        return Optional.empty();
    }

    public Optional<Group> regenerateJoinCode(int id) {
        Optional<Group> group = groupRepository.findById(id);
        if (group.isPresent()) {
            Group updatedGroup = group.get();
            SecureRandom random = new SecureRandom();
            String joinCode = String.format("%08x", random.nextInt(0x10000000));
            updatedGroup.setJoinCode(joinCode);
            return Optional.of(groupRepository.save(updatedGroup));
        }
        return Optional.empty();
    }

    public List<Group> getGroupsByCreator(int creator) {
        return groupRepository.findByCreator(creator);
    }

    public List<Group> getGroupsByUser(int userId) {
        return groupRepository.findByMembersContains(userId);
    }

    public List<Group> getAllGroups() {
        return groupRepository.findAll();
    }

    public boolean isGroupCreator(int id, int creator) {
        return groupRepository.existsByIdAndCreator(id, creator);
    }

    public boolean isGroupMember(int id, int userId) {
        return groupRepository.existsByIdAndMembersContains(id, userId);
    }

}
