/**
 * Authorization utility for role-based access control
 * Supports hierarchical permissions: superAdmin > admin > editor
 *
 * @param {Object} user - User object with role and isSuperAdmin properties
 * @param {string} requiredLevel - Required permission level ('editor'|'admin'|'superAdmin')
 * @throws {Error} Authorization error with specific message
 */
export const isAuthorized = (user, requiredLevel) => {
  // Validate user status
  if (!user?.isActive) throw new Error("User inactive");

  // Super admin bypass - isSuperAdmin flag overrides role hierarchy
  if (user.isSuperAdmin) return true;

  // Role hierarchy mapping with numeric levels for comparison
  const roles = { editor: 1, admin: 2, superAdmin: 3 };

  // Determine effective user level (isSuperAdmin flag takes precedence)
  const userLevel = user.isSuperAdmin ? 3 : roles[user.role] || 0;
  const required = roles[requiredLevel] || 0;

  // Enforce hierarchical access control
  if (userLevel < required) {
    throw new Error(`${requiredLevel} access required`);
  }
};

/**
 * Usage examples:
 * isAuthorized(user, 'superAdmin'); // Only isSuperAdmin=true
 * isAuthorized(user, 'admin');      // isSuperAdmin=true OR role='admin'
 * isAuthorized(user, 'editor');     // Any authorized user (editor+)
 */
