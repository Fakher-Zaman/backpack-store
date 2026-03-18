# 🧠 Claude Spec Template

> This template is used when running `/spec [feature]`
> Claude must generate a new spec file inside `.claude/.spec/` using this structure.

---

# Feature Specification: {{feature_name}}

## 1. Overview
Explain the feature clearly and simply.
- What is being built?
- Why is it needed in the current system?

## 2. Problem Statement
What problem does this solve?
What happens if we don't implement this?

## 3. Goals & Objectives
- Primary goal
- Secondary goals

## 4. User Stories
- As a user, I want to ___ so that ___
- As an admin, I want to ___

## 5. Functional Requirements
List clear, testable requirements:
- Feature behavior
- UI actions
- System responses

Example:
- User can add/remove items from wishlist
- User can filter products by category and price

## 6. Non-Functional Requirements
- Performance (fast load, optimized images)
- Responsiveness (mobile-first)
- Accessibility (keyboard, contrast)

## 7. UI/UX Guidelines
- Follow existing design system
- Keep consistency with current layout
- Mention animations / transitions if needed

## 8. Technical Design
### Frontend
- Components to create/update
- State management approach

### Backend (if needed)
- APIs
- Database changes

## 9. Data Structures (if applicable)
```json
{
  "example": "data structure"
}