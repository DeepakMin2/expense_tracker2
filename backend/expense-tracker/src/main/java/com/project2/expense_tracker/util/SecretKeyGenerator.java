package com.project2.expense_tracker.util;

import java.security.SecureRandom;
import java.util.Base64;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

public class SecretKeyGenerator {

	public static SecretKey generateSecretKey(String encodedSecretKey) {
		byte[] decodedKey = Base64.getDecoder().decode(encodedSecretKey);
 		return new SecretKeySpec(decodedKey, 0, decodedKey.length, "HmacSHA256");
	}

}
