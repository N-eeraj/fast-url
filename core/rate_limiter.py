from limits import RateLimitItemPerMinute, RateLimitItem
from limits.storage import MemoryStorage
from limits.strategies import FixedWindowRateLimiter
from dataclasses import dataclass
from limits import RateLimitItem

@dataclass(frozen=True)
class RateLimitRule:
    bucket: str
    limit: RateLimitItem

storage = MemoryStorage()
limiter = FixedWindowRateLimiter(storage)

AUTHENTICATED_USER_REQUESTS_PER_MINUTE = 60

AUTH_USER_RULE = RateLimitRule(
    bucket="user",
    limit=RateLimitItemPerMinute(AUTHENTICATED_USER_REQUESTS_PER_MINUTE),
)

def check_rate_limit(
    rule: RateLimitRule,
    key: str,
) -> bool:
    return limiter.hit(
        rule.limit,
        rule.bucket,
        key,
    )
